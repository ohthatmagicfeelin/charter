import express from 'express';
import { internalSensorController } from '../controllers/internalSensorController.js';

const router = express.Router();

router.get('/readings', internalSensorController.getLatestReadings);
router.get('/readings/device/:deviceId', internalSensorController.getDeviceReadings);
router.get('/readings/type/:type', internalSensorController.getReadingsByType);
router.get('/devices', internalSensorController.getDeviceList);
router.get('/types', internalSensorController.getTypeList);

export default router; 