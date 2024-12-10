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
  },

  createBatchReadings: async (readings) => {
    try {
      // Validate that readings is an array
      if (!Array.isArray(readings)) {
        throw new AppError('Readings must be an array', 400);
      }

      // Validate each reading has required fields
      readings.forEach(reading => {
        if (!reading.type || !reading.value || !reading.deviceId) {
          throw new AppError('Each reading must have type, value, and deviceId', 400);
        }
      });

      // Use prisma transaction to insert all readings
      return await sensorRepository.createBatch(readings);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error saving batch sensor data', 500);
    }
  },

  getDeviceList: async () => {
    try {
      return await sensorRepository.getUniqueDevices();
    } catch (error) {
      throw new AppError('Error fetching device list', 500);
    }
  }
}; 