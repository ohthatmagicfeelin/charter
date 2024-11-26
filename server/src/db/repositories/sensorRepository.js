import prisma from '../client.js'

export const sensorRepository = {
  create: async (data) => {
    return prisma.sensorData.create({
      data: {
        value: data.value,
        type: data.type,
        deviceId: data.deviceId
      }
    });
  },

  findByDeviceId: async (deviceId, limit = 100) => {
    return prisma.sensorData.findMany({
      where: { deviceId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  },

  getLatestReadings: async (limit = 100, types = null) => {
    return prisma.sensorData.findMany({
      where: types ? { type: { in: types } } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  },

  getReadingsByType: async (type, hours = 24) => {
    const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    return prisma.sensorData.findMany({
      where: {
        type,
        createdAt: { gte: startTime }
      },
      orderBy: { createdAt: 'asc' }
    });
  },

  createBatch: async (readings) => {
    return await prisma.sensorData.createMany({
      data: readings.map(reading => ({
        type: reading.type,
        value: parseFloat(reading.value),
        deviceId: reading.deviceId,
        createdAt: reading.timestamp || new Date()
      })),
    });
  },
  

};