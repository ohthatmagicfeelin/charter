import express from 'express';
import { externalSensorController } from '../controllers/externalSensorController.js';
import { deviceAuth } from '../../../middleware/deviceAuth.js';

const router = express.Router();

router.use(deviceAuth);
router.post('/', externalSensorController.create);
router.post('/batch', externalSensorController.createBatchReadings);
router.get('/device/:deviceId', externalSensorController.getDeviceReadings);


export default router; 