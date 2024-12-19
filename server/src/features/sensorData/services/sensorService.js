import { sensorRepository } from '../repositories/sensorRepository.js';
import { AppError } from '../../../utils/AppError.js';

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
      if (!Array.isArray(readings)) {
        throw new AppError('Readings must be an array', 400);
      }

      readings.forEach(reading => {
        if (!reading.type || !reading.value || !reading.deviceId || !reading.sensor) {
          throw new AppError('Each reading must have type, value, deviceId, and sensor', 400);
        }
      });

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
  },

  getTypeList: async () => {
    try {
      return await sensorRepository.getUniqueTypes();
    } catch (error) {
      throw new AppError('Error fetching type list', 500);
    }
  },

  getReadingsByDeviceAndType: async (deviceId, type, hours = 24) => {
    try {
      return await sensorRepository.getReadingsByDeviceAndType(deviceId, type, hours);
    } catch (error) {
      throw new AppError('Error fetching sensor data', 500);
    }
  }
}; 