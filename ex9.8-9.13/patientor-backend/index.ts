import express from 'express';
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

const PORT = 3001;
app.listen(PORT, ()=> {
  console.log(`Serve running on port ${PORT}`);
});
