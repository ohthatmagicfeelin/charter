import express from 'express';
import config from '../../config/env.js';
import deployRoutes from './deployRoutes.js';
import paymentRoutes from '../../features/payment/routes/paymentRoutes.js';
import authRoutes from '../../features/auth/routes/authRoutes.js';
import feedbackRoutes from '../../features/feedback/routes/feedbackRoutes.js';
import { apiLimiter } from '../../middleware/rateLimiter.js';
import settingsRoutes from '../../features/settings/routes/settingsRoutes.js';
import sessionRoutes from './sessionRoutes.js';
import externalSensorRoutes from '../../features/sensorData/routes/externalSensorRoutes.js';
import internalSensorRoutes from '../../features/sensorData/routes/internalSensorRoutes.js';
import chartConfigRoutes from '../../features/chartConfig/routes/chartConfigRoutes.js';

const router = express.Router();

// Determine whether to use base path based on environment
const isProduction = config.NODE_ENV === 'production';
const basePath = isProduction ? config.APP_ROUTE : '';

// ESP32 routes - no session/CSRF requirements
router.use(`${basePath}/api/v1/sensor`, externalSensorRoutes);
// Protected routes with session/CSRF
router.use(`${basePath}/api/internal/sensor`, internalSensorRoutes);
router.use(`${basePath}/api`, apiLimiter);
router.use(`${basePath}/api`, paymentRoutes)
router.use(`${basePath}/api`, authRoutes)
router.use(`/api/health`, deployRoutes);
router.use(`${basePath}/api/feedback`, feedbackRoutes);
router.use(`${basePath}/api/settings`, settingsRoutes);
router.use(`${basePath}/api/sessions`, sessionRoutes);
router.use(`${basePath}/api/chart-config`, chartConfigRoutes);

export default router;