import 'dotenv/config';
import app from './app.js';
import { startGrpcServer } from './src/grpc/server.js';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Books REST service running on port ${PORT}`);
});

startGrpcServer();