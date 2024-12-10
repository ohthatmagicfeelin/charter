import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';
import { sensorService } from '../services/sensorService.js';

export const internalSensorController = {
  getLatestReadings: catchAsync(async (req, res) => {
    const { limit = 100, types } = req.query;
    const typeArray = types ? types.split(',') : null;
    
    const data = await sensorService.getLatestReadings(parseInt(limit), typeArray);
    res.json({ data });
  }),

  getReadingsByType: catchAsync(async (req, res) => {
    const { type } = req.params;
    const { hours = 24 } = req.query;
    
    const data = await sensorService.getReadingsByType(type, parseInt(hours));
    res.json({ data });
  }),

  getDeviceReadings: catchAsync(async (req, res) => {
    const { deviceId } = req.params;
    const { limit = 100 } = req.query;
    
    const data = await sensorService.getDeviceReadings(deviceId, parseInt(limit));
    res.json({ data });
  }),

  getSensorStats: catchAsync(async (req, res) => {
    const { type } = req.params;
    const { hours = 24 } = req.query;

    const data = await sensorService.getSensorStats(type, parseInt(hours));
    res.json({ data });
  }),

  getLatestValues: catchAsync(async (req, res) => {
    const data = await sensorService.getLatestValuesByType();
    res.json({ data });
  }),

  getDeviceList: catchAsync(async (req, res) => {
    const devices = await sensorService.getDeviceList();
    res.json({ data: devices });
  }),

  getTypeList: catchAsync(async (req, res) => {
    const types = await sensorService.getTypeList();
    res.json({ data: types });
  }),

  getReadingsByDeviceAndType: catchAsync(async (req, res) => {
    const { deviceId, type } = req.params;
    const { hours = 24 } = req.query;

    const data = await sensorService.getReadingsByDeviceAndType(
      deviceId, 
      type, 
      parseInt(hours)
    );
    res.json({ data });
  })
}; 