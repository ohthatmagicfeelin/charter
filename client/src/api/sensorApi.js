import api from '@/api/api.js';

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
  },

  getTypeList: async () => {
    const response = await api.get('/api/internal/sensor/types');
    return response.data;
  },

  getReadingsByDeviceAndType: async (deviceId, type, hours = 24) => {
    const response = await api.get(
      `/api/internal/sensor/readings/device/${deviceId}/type/${type}?hours=${hours}`
    );
    return response.data;
  },

  getSensorList: async () => {
    const response = await api.get('/api/internal/sensor/sensors');
    return response.data;
  },

  getSensorsByDevice: async (deviceId) => {
    const response = await api.get(`/api/internal/sensor/devices/${deviceId}/sensors`);
    return response.data;
  },

  getTypesBySensor: async (sensor) => {
    const response = await api.get(`/api/internal/sensor/sensors/${sensor}/types`);
    return response.data;
  },

  getTypesBySensorAndDevice: async (deviceId, sensor) => {
    const response = await api.get(`/api/internal/sensor/devices/${deviceId}/sensors/${sensor}/types`);
    return response.data;
  },
}; 