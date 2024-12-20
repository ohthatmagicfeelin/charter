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

const flattenConfig = (config) => {
  if (!config) return DEFAULT_CONFIG;

  // Handle deeply nested structure from DB
  const extractConfigs = (obj) => {
    const configs = [];
    
    // Recursively search for valid config objects
    const findConfigs = (obj) => {
      if (!obj || typeof obj !== 'object') return;
      
      // Check if current object is a valid config
      if (obj.id && obj.deviceId && obj.sensor) {
        configs.push({
          id: obj.id,
          deviceId: obj.deviceId,
          sensor: obj.sensor,
          yMin: obj.yMin,
          yMax: obj.yMax,
          display: obj.display || 'raw',
          color: obj.color
        });
        return;
      }
      
      // Search nested objects
      Object.values(obj).forEach(findConfigs);
    };
    
    findConfigs(obj);
    return configs;
  };

  // If we get a response with nested config property
  if (config.config) {
    const extracted = extractConfigs(config.config);
    return extracted.length > 0 ? extracted : DEFAULT_CONFIG;
  }
  
  // If we get a direct array of configs
  if (Array.isArray(config)) {
    const extracted = extractConfigs({ items: config });
    return extracted.length > 0 ? extracted : DEFAULT_CONFIG;
  }
  
  // If we get a single config object
  const extracted = extractConfigs(config);
  return extracted.length > 0 ? extracted : DEFAULT_CONFIG;
};

export const chartConfigService = {
  saveConfig: async (config) => {
    try {
      // Ensure we're sending a clean array of configs
      const cleanConfig = config.map(item => ({
        id: item.id,
        deviceId: item.deviceId,
        sensor: item.sensor,
        yMin: item.yMin,
        yMax: item.yMax,
        display: item.display || 'raw',
        color: item.color
      }));
      
      const response = await chartConfigApi.saveConfig(cleanConfig);
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
      return flattenConfig(response?.config);
    } catch (error) {
      console.error('Error loading chart configuration:', error);
      return DEFAULT_CONFIG;
    }
  }
}; 