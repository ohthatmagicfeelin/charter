import { sensorRepository } from '../db/repositories/sensorRepository.js';
import { AppError } from '../utils/AppError.js';

export const sensorService = {
  createReading: async (data) => {
    try {
      return await sensorRepository.create(data);
    } catch (error) {
      throw new AppError('Error saving sensor data', 500);
    }
  },

  getDeviceReadings: async (deviceId) => {
    try {
      return await sensorRepository.findByDeviceId(deviceId);
    } catch (error) {
      throw new AppError('Error fetching sensor data', 500);
    }
  }
}; 