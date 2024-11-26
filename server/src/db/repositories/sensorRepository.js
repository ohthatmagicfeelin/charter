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
  }
}; 