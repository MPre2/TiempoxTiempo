import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Transaction {
  id: number;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

const transactions: Transaction[] = [
  {
    id: 1,
    type: 'credit',
    amount: 5,
    description: 'Clases de Inglés',
    date: '15/03/2024',
    status: 'completed',
  },
  {
    id: 2,
    type: 'debit',
    amount: 3,
    description: 'Reparación de Computadora',
    date: '10/03/2024',
    status: 'completed',
  },
  {
    id: 3,
    type: 'credit',
    amount: 4,
    description: 'Diseño Gráfico',
    date: '05/03/2024',
    status: 'pending',
  },
];

export const TimeBank = () => {
  const [balance, setBalance] = useState({
    total: 25,
    available: 15,
    pending: 10,
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Banco de Tiempo
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <AccessTimeIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                <Typography variant="h3" color="primary" sx={{ mt: 2 }}>
                  {balance.total}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Horas Totales
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress
                  variant="determinate"
                  value={(balance.available / balance.total) * 100}
                  size={80}
                  thickness={4}
                  sx={{ color: 'success.main' }}
                />
                <Typography variant="h3" color="success.main" sx={{ mt: 2 }}>
                  {balance.available}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Horas Disponibles
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress
                  variant="determinate"
                  value={(balance.pending / balance.total) * 100}
                  size={80}
                  thickness={4}
                  sx={{ color: 'warning.main' }}
                />
                <Typography variant="h3" color="warning.main" sx={{ mt: 2 }}>
                  {balance.pending}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Horas Pendientes
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Historial de Transacciones
              </Typography>
              <List>
                {transactions.map((transaction) => (
                  <div key={transaction.id}>
                    <ListItem>
                      <ListItemIcon>
                        {transaction.type === 'credit' ? (
                          <AddIcon color="success" />
                        ) : (
                          <RemoveIcon color="error" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={transaction.description}
                        secondary={`${transaction.date} - ${transaction.status}`}
                      />
                      <Typography
                        variant="h6"
                        color={transaction.type === 'credit' ? 'success.main' : 'error.main'}
                      >
                        {transaction.type === 'credit' ? '+' : '-'}
                        {transaction.amount} horas
                      </Typography>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" color="primary" size="large">
          Ver Reporte Detallado
        </Button>
      </Box>
    </Container>
  );
}; 