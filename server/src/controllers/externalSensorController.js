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
  }),

  createBatchReadings: catchAsync(async (req, res) => {
    const readings = req.body;
    console.log(readings);
    // Convert object with numeric keys to array
    const readingsArray = Object.values(readings);
    
    // Validate readings exist
    if (!readingsArray.length) {
      throw new AppError('No readings provided', 400);
    }

    // Process each reading to ensure values are numbers
    const processedReadings = readingsArray.map(reading => ({
      value: parseFloat(reading.value),
      type: reading.type,
      deviceId: reading.deviceId,
      timestamp: reading.timestamp ? new Date(reading.timestamp) : undefined
    }));

    const result = await sensorService.createBatchReadings(processedReadings);

    res.status(201).json({ 
      success: true,
      count: result.count,
      message: `Successfully created ${result.count} readings`
    });
  }),

  
}; 