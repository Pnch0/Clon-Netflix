import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { supabase } from './Services/supabase.js';

import routeMovies from './Routes/routes.movies.js'
import routeUsers from './Routes/routes.users.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', routeUsers);
app.use('/api', routeMovies);

const PORT = process.env.PORT || 3000;


app.get('/api/ping', async (req, res) => {
  await supabase.from('users').select('id').limit(1);
  res.status(200).json({ message: 'Servidor y BD activos' });
});


app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`))