import prisma from '../../../db/client.js';
import { AppError } from '../../../utils/AppError.js';

export const ChartConfigRepository = {
  upsert: async (userId, config) => {
    try {
      return await prisma.chartConfig.upsert({
        where: {
          userId
        },
        update: {
          config,
          updatedAt: new Date()
        },
        create: {
          userId,
          config
        }
      });
    } catch (error) {
      throw new AppError('Database error while saving chart configuration', 500);
    }
  },

  findByUser: async (userId) => {
    try {
      return await prisma.chartConfig.findUnique({
        where: {
          userId
        }
      });
    } catch (error) {
      throw new AppError('Database error while fetching chart configuration', 500);
    }
  }
}; 