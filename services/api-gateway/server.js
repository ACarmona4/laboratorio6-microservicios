import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`API Gateway REST service running on port ${PORT}`);
});
