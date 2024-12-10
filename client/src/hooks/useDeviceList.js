import { useState, useEffect } from 'react';
import { sensorApi } from '@/api/sensorApi';

export const useDeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(true);
        const response = await sensorApi.getDeviceList();
        // Transform the device IDs into the format expected by the select
        const deviceList = response.data.map(deviceId => ({
          id: deviceId,
          label: deviceId
            .replace('esp32_', '')
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        }));
        setDevices(deviceList);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching device list:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return { devices, isLoading, error };
}; 