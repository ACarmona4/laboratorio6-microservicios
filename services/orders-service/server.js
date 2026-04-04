import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Orders REST service running on port ${PORT}`);
});