import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab, Box } from '@mui/material';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

interface LeaderboardEntry {
  userId: string;
  displayName: string;
  score: number;
  category: string;
}

const LeaderboardDisplay: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [category, setCategory] = useState('experience');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const db = getFirestore();
      const leaderboardRef = collection(db, 'leaderboards');
      const q = query(
        leaderboardRef,
        orderBy('score', 'desc'),
        limit(10)
      );

      const snapshot = await getDocs(q);
      const entries = snapshot.docs.map(doc => doc.data() as LeaderboardEntry);
      setLeaderboard(entries);
    };

    fetchLeaderboard();
  }, [category]);

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Tabla de Clasificación
      </Typography>
      
      <Tabs
        value={category}
        onChange={handleCategoryChange}
        sx={{ mb: 2 }}
      >
        <Tab label="Experiencia" value="experience" />
        <Tab label="Tiempo" value="time" />
        <Tab label="Calificación" value="rating" />
      </Tabs>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Posición</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell align="right">Puntuación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((entry, index) => (
              <TableRow
                key={entry.userId}
                sx={{
                  backgroundColor: entry.userId === currentUser?.uid ? 'action.selected' : 'inherit'
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.displayName}</TableCell>
                <TableCell align="right">{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LeaderboardDisplay; 