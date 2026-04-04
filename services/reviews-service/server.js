import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Reviews REST service running on port ${PORT}`);
});