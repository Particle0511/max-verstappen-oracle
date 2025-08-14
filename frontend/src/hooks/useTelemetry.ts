import { useState, useEffect } from 'react';
import { TelemetryData } from '@/types';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_TELEMETRY_URL || 'ws://localhost:8765';

export const useTelemetry = () => {
  const [latestData, setLatestData] = useState<TelemetryData | null>(null);
  const [history, setHistory] = useState<TelemetryData[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log('Connected to telemetry WebSocket');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data: TelemetryData = JSON.parse(event.data);
      setLatestData(data);
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory, data];
        // Keep only the last 100 data points for performance
        return newHistory.slice(-100);
      });
    };

    ws.onclose = () => {
      console.log('Disconnected from telemetry WebSocket');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    // Clean up the connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return { latestData, history, isConnected };
};