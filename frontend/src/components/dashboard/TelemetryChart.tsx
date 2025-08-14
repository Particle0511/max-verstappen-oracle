import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TelemetryData } from '@/types';

interface TelemetryChartProps {
  data: TelemetryData[];
}

const TelemetryChart = ({ data }: TelemetryChartProps) => {
  // Format the data for the chart
  const chartData = data.map((d, i) => ({
    time: i, // Use index as a simple time axis
    speed: d.car_data.speed,
    rpm: d.car_data.rpm,
  }));

  return (
    <div className="bg-oracle-lightblue p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-oracle-lightgray mb-4">Live Telemetry</h2>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <XAxis dataKey="time" stroke="#8892B0" tick={false} />
            <YAxis yAxisId="left" stroke="#F82305" domain={[0, 400]} />
            <YAxis yAxisId="right" orientation="right" stroke="#8892B0" domain={[0, 15000]} />
            <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: '1px solid #8892B0' }} />
            <Line yAxisId="left" type="monotone" dataKey="speed" stroke="#F82305" strokeWidth={2} dot={false} animationDuration={300} />
            <Line yAxisId="right" type="monotone" dataKey="rpm" stroke="#8892B0" strokeWidth={2} dot={false} animationDuration={300} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TelemetryChart;