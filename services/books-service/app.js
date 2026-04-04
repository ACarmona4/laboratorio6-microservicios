import express from 'express';
import cors from 'cors';
import bookRoutes from './src/routes/bookRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'books-service',
    status: 'ok',
  });
});

app.use('/books', bookRoutes);

export default app;