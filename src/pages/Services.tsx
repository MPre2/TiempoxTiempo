import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  Avatar,
  Rating,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Service {
  id: number;
  title: string;
  provider: {
    name: string;
    avatar: string;
    rating: number;
  };
  category: string;
  description: string;
  timeRequired: number;
  tags: string[];
}

const services: Service[] = [
  {
    id: 1,
    title: 'Clases de Inglés',
    provider: {
      name: 'María García',
      avatar: '/avatar1.jpg',
      rating: 4.5,
    },
    category: 'Educación',
    description: 'Clases personalizadas de inglés para todos los niveles',
    timeRequired: 2,
    tags: ['Idiomas', 'Educación', 'Online'],
  },
  {
    id: 2,
    title: 'Reparación de Computadoras',
    provider: {
      name: 'Carlos Rodríguez',
      avatar: '/avatar2.jpg',
      rating: 4.8,
    },
    category: 'Tecnología',
    description: 'Servicio de reparación y mantenimiento de computadoras',
    timeRequired: 3,
    tags: ['Tecnología', 'Reparación', 'Presencial'],
  },
];

export const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Servicios Disponibles
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={selectedCategory}
              label="Categoría"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="Educación">Educación</MenuItem>
              <MenuItem value="Tecnología">Tecnología</MenuItem>
              <MenuItem value="Hogar">Hogar</MenuItem>
              <MenuItem value="Salud">Salud</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} md={6} key={service.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={service.provider.avatar}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{service.title}</Typography>
                    <Typography color="text.secondary">
                      {service.provider.name}
                    </Typography>
                    <Rating value={service.provider.rating} readOnly size="small" />
                  </Box>
                </Box>

                <Typography variant="body1" paragraph>
                  {service.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {service.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    {service.timeRequired} horas
                  </Typography>
                  <Button variant="contained" color="primary">
                    Solicitar Servicio
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="outlined" color="primary" size="large">
          Ofrecer un Servicio
        </Button>
      </Box>
    </Container>
  );
}; 