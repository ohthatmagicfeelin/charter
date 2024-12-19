import express from 'express';
import { internalSensorController } from '../controllers/internalSensorController.js';

const router = express.Router();

router.get('/readings', internalSensorController.getLatestReadings);
router.get('/readings/device/:deviceId', internalSensorController.getDeviceReadings);
router.get('/readings/type/:type', internalSensorController.getReadingsByType);
router.get('/devices', internalSensorController.getDeviceList);
router.get('/types', internalSensorController.getTypeList);
router.get('/readings/device/:deviceId/type/:type', internalSensorController.getReadingsByDeviceAndType);
router.get('/sensors', internalSensorController.getSensorList);
router.get('/devices/:deviceId/sensors', internalSensorController.getDeviceSensors);
router.get('/sensors/:sensor/types', internalSensorController.getTypesBySensor);
router.get('/devices/:deviceId/sensors/:sensor/types', internalSensorController.getTypesBySensorAndDevice);

export default router; 