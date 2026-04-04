import express from 'express';
import cors from 'cors';
import orderRoutes from './src/routes/orderRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'orders-service',
    status: 'ok',
  });
});

app.use('/orders', orderRoutes);

export default app;