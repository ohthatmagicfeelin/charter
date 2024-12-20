import { chartConfigApi } from '@/api/chartConfig';

const DEFAULT_CONFIG = [{
  id: 'temperature',
  deviceId: 'Kitchen',
  sensor: 'bme680',
  yMin: null,
  yMax: null,
  display: 'raw',
  color: null
}];

export const chartConfigService = {
  saveConfig: async (config) => {
    try {
      const response = await chartConfigApi.saveConfig(config);
      console.log('Chart configuration saved:', response);
      return response;
    } catch (error) {
      console.error('Error saving chart configuration:', error);
      return { success: false };
    }
  },

  loadConfig: async () => {
    try {
      const response = await chartConfigApi.getConfig();
      console.log('Chart configuration loaded:', response);
      if (!response?.config || !Array.isArray(response.config)) {
        return DEFAULT_CONFIG;
      }
      return response.config;
    } catch (error) {
      console.error('Error loading chart configuration:', error);
      return DEFAULT_CONFIG;
    }
  }
}; 