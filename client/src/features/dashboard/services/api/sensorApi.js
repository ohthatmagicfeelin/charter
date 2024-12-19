export const getLastUpdateTime = async (deviceId, typeId) => {
  const response = await api.get(`/sensor/last-update/${deviceId}/${typeId}`);
  return response.data.lastUpdate;
}; 