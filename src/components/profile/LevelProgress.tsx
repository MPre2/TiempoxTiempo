import React from 'react';
import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const LevelProgress: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const experienceToNextLevel = Math.pow(currentUser.level + 1, 2) * 100;
  const progress = (currentUser.experience / experienceToNextLevel) * 100;

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          Nivel {currentUser.level}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {currentUser.experience} / {experienceToNextLevel} XP
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          height: 10, 
          borderRadius: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'primary.main',
          }
        }} 
      />
    </Paper>
  );
};

export default LevelProgress; 