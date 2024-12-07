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
    // Create dates in Sydney timezone
    const now = new Date();
    const startTime = new Date(now - hours * 60 * 60 * 1000);
    
    // Convert to UTC for query
    const utcNow = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
    const utcStartTime = new Date(startTime.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
    
    // Add 11 hours to account for Sydney timezone
    utcNow.setHours(utcNow.getHours() + 11);
    utcStartTime.setHours(utcStartTime.getHours() + 11);
    
    console.log('Query time range:', {
        localStart: startTime.toISOString(),
        localEnd: now.toISOString(),
        utcStart: utcStartTime.toISOString(),
        utcEnd: utcNow.toISOString(),
        type,
        currentTime: new Date().toISOString()
    });
    
    const results = await prisma.sensorData.findMany({
      where: {
        type,
        createdAt: {
          gte: utcStartTime,
          lte: utcNow
        }
      },
      orderBy: { createdAt: 'asc' }
    });
    
    console.log(`Found ${results.length} records`);
    return results;
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