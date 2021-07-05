import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesRouter';
import patientsRouter from './routes/patientsRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.listen(PORT, ()=> {
  console.log(`Serve running on port ${PORT}`);
});
