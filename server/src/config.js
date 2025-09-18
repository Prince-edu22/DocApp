const dotenv = require('dotenv');
dotenv.config();

const config = {
  port: process.env.PORT || 5174,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/doctor_appointments',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
  nodeEnv: process.env.NODE_ENV || 'development',
};

module.exports = config;


