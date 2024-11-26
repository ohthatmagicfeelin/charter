import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';
import { sensorService } from '../services/sensorService.js';

export const externalSensorController = {
  create: catchAsync(async (req, res) => {
    const { value, type, deviceId } = req.body;

    if (!value || !type || !deviceId) {
      throw new AppError('Missing required fields', 400);
    }

    const data = await sensorService.createReading({
      value: parseFloat(value),
      type,
      deviceId
    });

    res.status(201).json({ 
      success: true,
      data 
    });
  }),

  getDeviceReadings: catchAsync(async (req, res) => {
    const { deviceId } = req.params;
    const data = await sensorService.getDeviceReadings(deviceId);
    res.json({ data });
  })
}; 