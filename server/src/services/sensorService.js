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
  },

  getLatestReadings: async (limit = 100, types = null) => {
    try {
      return await sensorRepository.getLatestReadings(limit, types);
    } catch (error) {
      throw new AppError('Error fetching sensor data', 500);
    }
  },

  getReadingsByType: async (type, hours = 24) => {
    try {
      return await sensorRepository.getReadingsByType(type, hours);
    } catch (error) {
      throw new AppError('Error fetching sensor data', 500);
    }
  }
}; 