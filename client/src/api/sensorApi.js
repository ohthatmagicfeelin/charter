import api from '@/services/api';

export const sensorApi = {
  getReadingsByType: async (type, hours = 24) => {
    const response = await api.get(`/api/internal/sensor/readings/type/${type}?hours=${hours}`);
    return response.data;
  },

  getLatestReadings: async (limit = 100, types = null) => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit);
    if (types) params.append('types', types.join(','));
    
    const response = await api.get(`/api/internal/sensor/readings?${params}`);
    return response.data;
  },

  getDeviceList: async () => {
    const response = await api.get('/api/internal/sensor/devices');
    return response.data;
  }
}; 