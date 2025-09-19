const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const config = require('./config');

const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: config.nodeEnv });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Serve client build in production
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// SPA fallback (after API routes)
// app.get('*', (req, res) => {
//   // Avoid intercepting API calls
//   if (req.path.startsWith('/api/')) return res.status(404).json({ message: 'Not found' });
//   return res.sendFile(path.join(clientDistPath, 'index.html'));
// });
// SPA fallback (after API routes)
app.get(/.*/, (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.sendFile(path.join(clientDistPath, 'index.html'));
});


// Connect DB and start server
async function start() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connected');
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();


