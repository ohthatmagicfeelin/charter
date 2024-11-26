import React from 'react';
import SensorChart from '@/components/SensorChart';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <SensorChart type="temperature" hours={24} />
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <SensorChart type="humidity" hours={24} />
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <SensorChart type="pressure" hours={24} />
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <SensorChart type="air_quality" hours={24} />
      </div>
    </div>
  );
};

export default Dashboard; 