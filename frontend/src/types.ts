export interface TelemetryData {
  timestamp: string;
  driver: string;
  car_data: {
    speed: number;
    rpm: number;
    gear: number;
    throttle: number;
    brake: number;
    drs_enabled: boolean;
  };
  lap_data: {
    current_lap: number;
    lap_time: number;
    sector: number;
  };
  tyre_data: {
    compound: string;
    wear_level: number;
  };
}