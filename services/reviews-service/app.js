import express from 'express';
import cors from 'cors';
import reviewRoutes from './src/routes/reviewRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'reviews-service',
    status: 'ok',
  });
});

app.use('/reviews', reviewRoutes);

export default app;