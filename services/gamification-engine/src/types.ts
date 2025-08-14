export interface Prediction {
  id: number;
  userId: number;
  predictionType: 'qualifying' | 'fastest_lap' | 'race_result';
  value: any;
  timestamp: Date;
}

export interface LeaderboardEntry {
  userId: number;
  name: string;
  points: number;
}