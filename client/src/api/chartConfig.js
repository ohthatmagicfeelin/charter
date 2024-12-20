import api from './api.js';

export const chartConfigApi = {
  saveConfig: async (config) => {
    const response = await api.post('/api/chart-config', { config });
    return response.data;
  },

  getConfig: async () => {
    const response = await api.get('/api/chart-config');
    return response.data;
  }
}; 