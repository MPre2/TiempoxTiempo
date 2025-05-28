import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Badge,
  Box,
  Divider
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { messagingService } from '../../services/messaging';
import type { Chat } from '../../types/chat';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const ChatList: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = messagingService.subscribeToUserChats(
      currentUser.uid,
      (updatedChats) => {
        setChats(updatedChats);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  if (!currentUser) return null;

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {chats.map((chat) => {
        const otherParticipant = chat.participants.find(id => id !== currentUser.uid);
        const unreadCount = chat.unreadCount[currentUser.uid] || 0;

        return (
          <React.Fragment key={chat.id}>
            <ListItem
              button
              onClick={() => handleChatClick(chat.id)}
              alignItems="flex-start"
              sx={{
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemAvatar>
                <Badge
                  color="primary"
                  badgeContent={unreadCount}
                  invisible={unreadCount === 0}
                >
                  <Avatar
                    alt={chat.lastMessage?.senderName || 'Usuario'}
                    src="/static/images/avatar/1.jpg"
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="text.primary"
                    sx={{ fontWeight: unreadCount > 0 ? 'bold' : 'normal' }}
                  >
                    {chat.lastMessage?.senderName || 'Nuevo chat'}
                  </Typography>
                }
                secondary={
                  <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: unreadCount > 0 ? 'bold' : 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {chat.lastMessage?.content || 'No hay mensajes'}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                    >
                      {chat.lastMessage?.createdAt
                        ? formatDistanceToNow(chat.lastMessage.createdAt.toDate(), {
                            addSuffix: true,
                            locale: es
                          })
                        : ''}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
}; 