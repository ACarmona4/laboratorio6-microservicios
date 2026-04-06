import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'users-service',
    status: 'ok',
  });
});

app.use('/users', userRoutes);

export default app;
