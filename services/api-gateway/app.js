import express from 'express';
import cors from 'cors';
import booksRoutes from './src/routes/booksRoutes.js';
import reviewsRoutes from './src/routes/reviewsRoutes.js';
import ordersRoutes from './src/routes/ordersRoutes.js';
import usersRoutes from './src/routes/usersRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'api-gateway',
    status: 'ok',
  });
});

app.use('/api/books', booksRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

export default app;
