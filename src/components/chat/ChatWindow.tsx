import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { messagingService } from '../../services/messaging';
import type { Message } from '../../types/chat';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatId } = useParams<{ chatId: string }>();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!chatId || !currentUser) return;

    const unsubscribe = messagingService.subscribeToMessages(
      chatId,
      (updatedMessages) => {
        setMessages(updatedMessages);
        setLoading(false);
      }
    );

    // Marcar mensajes como leídos
    messagingService.markMessagesAsRead(chatId, currentUser.uid);

    return () => unsubscribe();
  }, [chatId, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId || !currentUser) return;

    try {
      await messagingService.sendMessage(chatId, {
        chatId,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || 'Usuario',
        content: newMessage.trim(),
        type: 'text'
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  const handleSendLocation = async () => {
    if (!chatId || !currentUser) return;

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      await messagingService.sendMessage(chatId, {
        chatId,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || 'Usuario',
        content: 'Ubicación compartida',
        type: 'location',
        metadata: {
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }
      });
    } catch (error) {
      console.error('Error al compartir ubicación:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.senderId === currentUser?.uid ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Box
              sx={{
                maxWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.senderId === currentUser?.uid ? 'flex-end' : 'flex-start'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 0.5
                }}
              >
                <Avatar
                  sx={{ width: 24, height: 24, mr: 1 }}
                  src="/static/images/avatar/1.jpg"
                />
                <Typography variant="caption" color="text.secondary">
                  {message.senderName}
                </Typography>
              </Box>
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  bgcolor: message.senderId === currentUser?.uid ? 'primary.light' : 'grey.100',
                  color: message.senderId === currentUser?.uid ? 'white' : 'text.primary'
                }}
              >
                {message.type === 'location' && message.metadata?.location ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon sx={{ mr: 1 }} />
                    <Typography>
                      {message.metadata.location.latitude.toFixed(6)},
                      {message.metadata.location.longitude.toFixed(6)}
                    </Typography>
                  </Box>
                ) : (
                  <Typography>{message.content}</Typography>
                )}
              </Paper>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                {formatDistanceToNow(message.createdAt.toDate(), {
                  addSuffix: true,
                  locale: es
                })}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>
      <Divider />
      <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <IconButton size="small" sx={{ mr: 1 }}>
          <AttachFileIcon />
        </IconButton>
        <IconButton size="small" onClick={handleSendLocation} sx={{ mr: 1 }}>
          <LocationIcon />
        </IconButton>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          size="small"
          sx={{ mr: 1 }}
        />
        <IconButton
          color="primary"
          type="submit"
          disabled={!newMessage.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}; 