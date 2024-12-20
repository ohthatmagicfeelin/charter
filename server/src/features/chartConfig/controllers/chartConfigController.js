import { catchAsync } from '../../../utils/catchAsync.js';
import { AppError } from '../../../utils/AppError.js';
import { ChartConfigService } from '../services/chartConfigService.js';

export const ChartConfigController = {
  save: catchAsync(async (req, res) => {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    if (!req.body.config) {
      throw new AppError('Configuration data is required', 400);
    }

    const config = await ChartConfigService.saveConfig(
      req.user.id,
      req.body.config
    );

    res.status(200).json({ 
      config,
      message: 'Chart configuration saved successfully'
    });
  }),

  get: catchAsync(async (req, res) => {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const config = await ChartConfigService.getConfig(req.user.id);

    res.json({ config });
  })
}; 