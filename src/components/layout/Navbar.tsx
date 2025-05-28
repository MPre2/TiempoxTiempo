import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { NotificationCenter } from '../notifications/NotificationCenter';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          TiempoxTiempo
        </Typography>

        {currentUser ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NotificationCenter />
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt={currentUser.displayName || 'Usuario'}
                src={currentUser.photoURL || undefined}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                handleClose();
                navigate('/profile');
              }}>
                Perfil
              </MenuItem>
              <MenuItem onClick={() => {
                handleClose();
                navigate('/services');
              }}>
                Mis Servicios
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Iniciar Sesión
            </Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>
              Registrarse
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}; 