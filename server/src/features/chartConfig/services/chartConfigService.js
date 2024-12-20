import { AppError } from '../../../utils/AppError.js';
import { ChartConfigRepository } from '../repositories/chartConfigRepository.js';

export const ChartConfigService = {
  saveConfig: async (userId, config) => {
    try {
      return await ChartConfigRepository.upsert(userId, config);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error saving chart configuration', 500);
    }
  },

  getConfig: async (userId) => {
    try {
      const config = await ChartConfigRepository.findByUser(userId);
      if (!config) {
        return null;
      }
      return config.config;
    } catch (error) {
      throw new AppError('Error fetching chart configuration', 500);
    }
  }
}; 