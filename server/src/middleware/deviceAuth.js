import config from '../config/env.js';
import { AppError } from '../utils/AppError.js';

export const deviceAuth = (req, res, next) => {
  
  const apiKey = req.headers.authorization?.split(' ')[1];
  
  if (!apiKey || apiKey !== config.ESP32_API_KEY) {
    console.log('Auth failed. Keys match:', apiKey === config.ESP32_API_KEY);
    throw new AppError('Unauthorized device', 401);
  }
  
  next();
}; 