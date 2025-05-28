import React from 'react';
import { Container, Grid, Paper, Typography, Avatar, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import LevelProgress from './LevelProgress';
import BadgesDisplay from './BadgesDisplay';
import LeaderboardDisplay from './LeaderboardDisplay';
import StreakDisplay from './StreakDisplay';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Información del perfil */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={currentUser.photoURL || undefined}
                alt={currentUser.displayName || 'Usuario'}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {currentUser.displayName}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {currentUser.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Miembro desde {new Date(currentUser.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Paper>

          <LevelProgress />
          <StreakDisplay />
        </Grid>

        {/* Contenido principal */}
        <Grid item xs={12} md={8}>
          <BadgesDisplay />
          <LeaderboardDisplay />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 