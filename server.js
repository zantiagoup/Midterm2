import express from 'express';
import thronesRoutes from './routes/thrones.js';
import { errorHandler } from './middleware/errors.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serve the static frontend from ./public
app.use(express.static('public'));
app.use('/api', thronesRoutes);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
});