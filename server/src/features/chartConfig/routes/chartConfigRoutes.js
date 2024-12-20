import { Router } from 'express';
import { ChartConfigController } from '../controllers/chartConfigController.js';
import { requireAuth } from '../../../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.post('/', ChartConfigController.save);
router.get('/', ChartConfigController.get);

export default router; 