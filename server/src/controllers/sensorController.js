export const getLastUpdateTime = async (req, res) => {
  const { deviceId, typeId } = req.params;
  
  try {
    const lastReading = await prisma.sensorReading.findFirst({
      where: {
        deviceId,
        typeId
      },
      orderBy: {
        timestamp: 'desc'
      },
      select: {
        timestamp: true
      }
    });
    
    res.json({ lastUpdate: lastReading?.timestamp || null });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get last update time' });
  }
}; 