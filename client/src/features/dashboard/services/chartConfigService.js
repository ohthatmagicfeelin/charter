import api from '@/api/api.js';

export const chartConfigService = {
  saveConfig: async (config) => {
    // For now, just log the configuration
    console.log('Saving chart configuration:', config);
    return { success: true };
  },

  loadConfig: async () => {
    // For now, return null to indicate no saved config
    console.log('Loading chart configuration');
    return null;
  }
}; 