import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

interface Skill {
  id: number;
  name: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
}

export const Profile = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: 'Programación', level: 'Avanzado' },
    { id: 2, name: 'Diseño Gráfico', level: 'Intermedio' },
    { id: 3, name: 'Idiomas', level: 'Principiante' },
  ]);

  const [timeBalance, setTimeBalance] = useState({
    earned: 25,
    spent: 10,
    available: 15,
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                src="/avatar-placeholder.jpg"
              />
              <Typography variant="h5" gutterBottom>
                Juan Pérez
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Miembro desde 2024
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Balance de Tiempo
                </Typography>
                <Typography variant="h4" color="primary">
                  {timeBalance.available} horas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ganadas: {timeBalance.earned} | Gastadas: {timeBalance.spent}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mis Habilidades
              </Typography>
              <Box sx={{ mb: 3 }}>
                {skills.map((skill) => (
                  <Chip
                    key={skill.id}
                    label={`${skill.name} (${skill.level})`}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>

              <Typography variant="h6" gutterBottom>
                Historial de Intercambios
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Clases de Inglés"
                    secondary="2 horas - 15/03/2024"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Reparación de Computadora"
                    secondary="3 horas - 10/03/2024"
                  />
                </ListItem>
              </List>

              <Box sx={{ mt: 3 }}>
                <Button variant="contained" color="primary">
                  Editar Perfil
                </Button>
                <Button variant="outlined" sx={{ ml: 2 }}>
                  Agregar Habilidad
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}; 