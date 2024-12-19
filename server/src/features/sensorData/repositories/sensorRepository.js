import prisma from '../../../db/client.js'

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
        sensor: reading.sensor,
        deviceId: reading.deviceId,
        createdAt: reading.timestamp || new Date()
      })),
    });
  },

  getUniqueDevices: async () => {
    const devices = await prisma.sensorData.findMany({
      distinct: ['deviceId'],
      select: {
        deviceId: true,
      },
      orderBy: {
        deviceId: 'asc'
      }
    });
    return devices.map(d => d.deviceId);
  },

  getUniqueTypes: async () => {
    const types = await prisma.sensorData.findMany({
      distinct: ['type'],
      select: {
        type: true,
      },
      orderBy: {
        type: 'asc'
      }
    });
    return types.map(t => t.type);
  },

  getReadingsByDeviceAndType: async (deviceId, type, hours = 24) => {
    // Create dates in Sydney timezone
    const now = new Date();
    const startTime = new Date(now - hours * 60 * 60 * 1000);
    
    // Convert to UTC for query
    const utcNow = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
    const utcStartTime = new Date(startTime.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
    
    // Add 11 hours to account for Sydney timezone
    utcNow.setHours(utcNow.getHours() + 11);
    utcStartTime.setHours(utcStartTime.getHours() + 11);
    
    
    const results = await prisma.sensorData.findMany({
      where: {
        deviceId,
        type,
        createdAt: {
          gte: utcStartTime,
          lte: utcNow
        }
      },
      orderBy: { createdAt: 'asc' }
    });
    
    console.log(`Found ${results.length} records for device ${deviceId} and type ${type}`);
    return results;
  },

  getUniqueSensors: async () => {
    const sensors = await prisma.sensorData.findMany({
      distinct: ['sensor'],
      select: {
        sensor: true,
      },
      orderBy: {
        sensor: 'asc'
      }
    });
    return sensors.map(s => s.sensor);
  },

};