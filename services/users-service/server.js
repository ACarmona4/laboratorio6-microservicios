import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Users REST service running on port ${PORT}`);
});
