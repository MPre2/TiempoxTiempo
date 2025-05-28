import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  participants: number;
  description: string;
}

interface ForumPost {
  id: number;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  comments: number;
  likes: number;
  tags: string[];
}

export const Community = () => {
  const [activeTab, setActiveTab] = useState(0);

  const events: Event[] = [
    {
      id: 1,
      title: 'Taller de Intercambio de Habilidades',
      date: '20/03/2024',
      location: 'Centro Comunitario',
      participants: 15,
      description: 'Un espacio para compartir y aprender nuevas habilidades',
    },
    {
      id: 2,
      title: 'Encuentro de Emprendedores',
      date: '25/03/2024',
      location: 'Café Cultural',
      participants: 8,
      description: 'Networking y colaboración entre emprendedores',
    },
  ];

  const forumPosts: ForumPost[] = [
    {
      id: 1,
      title: '¿Cómo maximizar el valor de mi tiempo?',
      author: {
        name: 'Ana Martínez',
        avatar: '/avatar3.jpg',
      },
      content: 'Comparto mis experiencias y consejos para aprovechar mejor el tiempo...',
      comments: 5,
      likes: 12,
      tags: ['Consejos', 'Productividad'],
    },
    {
      id: 2,
      title: 'Nuevas ideas para intercambios',
      author: {
        name: 'Pedro Sánchez',
        avatar: '/avatar4.jpg',
      },
      content: 'Propongo algunas ideas innovadoras para intercambios...',
      comments: 3,
      likes: 8,
      tags: ['Innovación', 'Comunidad'],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Comunidad
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab icon={<EventIcon />} label="Eventos" />
          <Tab icon={<ForumIcon />} label="Foro" />
          <Tab icon={<GroupIcon />} label="Grupos" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {event.date} - {event.location}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <GroupIcon sx={{ mr: 1 }} />
                    <Typography>{event.participants} participantes</Typography>
                  </Box>
                  <Button variant="contained" color="primary">
                    Unirse al Evento
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Comparte tus ideas con la comunidad..."
                  variant="outlined"
                />
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Button variant="contained" color="primary">
                    Publicar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {forumPosts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={post.author.avatar} sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{post.title}</Typography>
                      <Typography color="text.secondary">
                        Por {post.author.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {post.content}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {post.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button size="small">Me gusta ({post.likes})</Button>
                    <Button size="small">Comentar ({post.comments})</Button>
                    <Button size="small">Compartir</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Grupos Populares
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <GroupIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Emprendedores"
                  secondary="123 miembros"
                />
                <Button variant="outlined" size="small">
                  Unirse
                </Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <GroupIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Educadores"
                  secondary="89 miembros"
                />
                <Button variant="outlined" size="small">
                  Unirse
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}; 