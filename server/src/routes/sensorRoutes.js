import express from 'express';
import { sensorController } from '../controllers/sensorController.js';
import { deviceAuth } from '../middleware/deviceAuth.js';

const router = express.Router();

router.use(deviceAuth);
router.post('/', sensorController.create);
router.get('/device/:deviceId', sensorController.getDeviceReadings);

export default router; 