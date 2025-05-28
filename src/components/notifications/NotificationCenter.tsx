import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Payment as PaymentIcon,
  Star as StarIcon,
  Info as InfoIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { notificationService } from '../../services/notifications';
import type { Notification } from '../../types/notification';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = notificationService.subscribeToNotifications(
      currentUser.uid,
      (updatedNotifications) => {
        setNotifications(updatedNotifications);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markNotificationAsRead(notificationId);
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!currentUser) return;
    try {
      await notificationService.markAllNotificationsAsRead(currentUser.uid);
    } catch (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageIcon />;
      case 'transaction':
        return <PaymentIcon />;
      case 'review':
        return <StarIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 360, maxHeight: 480 }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notificaciones</Typography>
          {unreadCount > 0 && (
            <MenuItem onClick={handleMarkAllAsRead}>
              <CheckIcon fontSize="small" sx={{ mr: 1 }} />
              Marcar todas como leídas
            </MenuItem>
          )}
        </Box>
        <Divider />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No hay notificaciones
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                sx={{
                  bgcolor: notification.read ? 'inherit' : 'action.hover',
                  '&:hover': {
                    bgcolor: 'action.selected'
                  }
                }}
              >
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" color="text.secondary">
                        {notification.body}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDistanceToNow(notification.createdAt.toDate(), {
                          addSuffix: true,
                          locale: es
                        })}
                      </Typography>
                    </Box>
                  }
                />
                {!notification.read && (
                  <IconButton
                    size="small"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <CheckIcon fontSize="small" />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Menu>
    </>
  );
}; 