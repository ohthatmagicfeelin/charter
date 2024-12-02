import express from 'express';
import { internalSensorController } from '../controllers/internalSensorController.js';

const router = express.Router();

router.get('/readings', internalSensorController.getLatestReadings);
router.get('/readings/device/:deviceId', internalSensorController.getDeviceReadings);
router.get('/readings/type/:type', internalSensorController.getReadingsByType);

export default router; 