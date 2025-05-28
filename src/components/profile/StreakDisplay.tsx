import React from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { LocalFireDepartment } from '@mui/icons-material';

const StreakDisplay: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const nextStreakMilestone = Math.ceil(currentUser.streak / 7) * 7;
  const progress = (currentUser.streak / nextStreakMilestone) * 100;

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <LocalFireDepartment color="error" sx={{ mr: 1 }} />
        <Typography variant="h6">
          Racha de Actividad
        </Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography variant="body1" sx={{ mb: 0.5 }}>
          {currentUser.streak} días consecutivos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Próximo hito: {nextStreakMilestone} días
        </Typography>
      </Box>

      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          height: 8, 
          borderRadius: 4,
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'error.main',
          }
        }} 
      />

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Última actividad: {new Date(currentUser.lastActivityDate).toLocaleDateString()}
      </Typography>
    </Paper>
  );
};

export default StreakDisplay; 