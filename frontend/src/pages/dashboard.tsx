import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_DATA } from '@/graphql/queries';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import TelemetryChart from '@/components/dashboard/TelemetryChart';
import { useTelemetry } from '@/hooks/useTelemetry';
import { Wifi, WifiOff, CloudSun } from 'lucide-react';
import React from 'react';

interface TelemetryWidgetProps {
  title: string;
  value?: string | number;
  unit?: string;
  children?: React.ReactNode;
}

const TelemetryWidget: React.FC<TelemetryWidgetProps> = ({ title, value, unit, children }) => (
  <div className="bg-oracle-lightblue p-4 rounded-lg shadow-lg text-center flex flex-col justify-center">
    <h3 className="text-lg font-semibold text-oracle-gray">{title}</h3>
    {children || (
      <p className="text-4xl font-bold text-oracle-lightgray mt-1">
        {value} <span className="text-lg text-oracle-gray">{unit}</span>
      </p>
    )}
  </div>
);

const DashboardPage = () => {
  const { loading, error, data } = useQuery(GET_DASHBOARD_DATA);
  const { latestData, history, isConnected } = useTelemetry();

  if (loading) return <p className="text-center text-oracle-gray">Loading Dashboard...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching data: {error.message}</p>;

  // A check to ensure data is available before destructuring
  if (!data) return <p className="text-center text-oracle-gray">Waiting for data...</p>;

  const { pitStopPrediction, overtakePrediction, leaderboard } = data;

  return (
    <>
      <Head>
        <title>Dashboard - Max Verstappen Oracle</title>
      </Head>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-oracle-lightgray">
            Live Command Center
          </h1>
          <div className={`flex items-center space-x-2 p-2 rounded-lg ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isConnected ? <Wifi size={20} /> : <WifiOff size={20} />}
            <span>{isConnected ? 'Live' : 'Disconnected'}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TelemetryWidget title="Speed" value={latestData?.car_data.speed || '---'} unit="km/h" />
              <TelemetryWidget title="RPM" value={latestData?.car_data.rpm || '---'} />
              <TelemetryWidget title="Gear" value={latestData?.car_data.gear || 'N'} />
              <TelemetryWidget title="DRS" value={latestData?.car_data.drs_enabled ? 'Active' : 'Inactive'} />
            </div>
            <TelemetryChart data={history} />
            <div className="bg-oracle-lightblue p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-oracle-lightgray mb-4">Fan Leaderboard</h2>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={leaderboard} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" width={100} stroke="#8892B0" axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#172A45'}} contentStyle={{backgroundColor: '#0A192F', border: '1px solid #8892B0'}} />
                    <Bar dataKey="points" barSize={30} radius={[0, 10, 10, 0]}>
                      {leaderboard.map((entry: { name: string; points: number }, index: number) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#F82305' : '#8892B0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
                <TelemetryWidget title="Current Lap" value={`${latestData?.lap_data.current_lap || '--'}/58`} />
                <TelemetryWidget title="Tyre" value={latestData?.tyre_data.compound || '---'} />
                <TelemetryWidget title="Weather">
                  <div className="flex items-center justify-center mt-2 space-x-2 text-oracle-lightgray">
                    <CloudSun size={28} />
                    <span className="text-3xl font-bold">24°C</span>
                  </div>
                </TelemetryWidget>
                <TelemetryWidget title="DRS" value={latestData?.car_data.drs_enabled ? 'Active' : 'Inactive'} />
            </div>
            <div className="bg-oracle-lightblue p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-oracle-gray">Pit Stop Prediction</h2>
              <p className="text-5xl font-bold text-oracle-red mt-2">
                Lap {pitStopPrediction.predicted_lap}
              </p>
              <p className="text-oracle-gray mt-1">
                Confidence: {(pitStopPrediction.confidence * 100).toFixed(0)}%
              </p>
            </div>
            <div className="bg-oracle-lightblue p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-oracle-gray">Overtake Prediction</h2>
              <p className="text-5xl font-bold text-oracle-red mt-2">
                {(overtakePrediction.probability * 100).toFixed(0)}%
              </p>
              <p className="text-oracle-gray mt-1">
                Chance to overtake {overtakePrediction.target_driver}
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default DashboardPage;
