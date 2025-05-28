import React from 'react';
import { Grid, Paper, Typography, Box, Tooltip } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { BADGES } from '../../assets/badges';

const BadgesDisplay: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Insignias
      </Typography>
      <Grid container spacing={2}>
        {Object.values(BADGES).map((badge) => {
          const hasBadge = currentUser.badges.includes(badge.id);
          return (
            <Grid item xs={6} sm={4} md={3} key={badge.id}>
              <Tooltip title={hasBadge ? badge.description : 'Insignia bloqueada'}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: hasBadge ? 1 : 0.5,
                    filter: hasBadge ? 'none' : 'grayscale(100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={badge.imageUrl}
                    alt={badge.name}
                    sx={{
                      width: 64,
                      height: 64,
                      mb: 1,
                    }}
                  />
                  <Typography variant="body2" align="center">
                    {badge.name}
                  </Typography>
                </Box>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default BadgesDisplay; 