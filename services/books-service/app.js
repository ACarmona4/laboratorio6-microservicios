import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bookRoutes from './src/routes/bookRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'books-service',
    status: 'ok',
  });
});

app.use('/books', bookRoutes);

export default app;
