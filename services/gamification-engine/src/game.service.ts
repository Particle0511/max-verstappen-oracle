import { Prediction, LeaderboardEntry, PredictionInput } from './types';

// In-memory data stores
const predictions: Prediction[] = [];
const leaderboard: LeaderboardEntry[] = [
  { userId: 1, name: 'MaxFan01', points: 150 },
  { userId: 2, name: 'SuperMax', points: 125 },
  { userId: 3, name: 'DutchLion', points: 110 },
];

export const createPrediction = async (predictionData: PredictionInput): Promise<Prediction> => {
  const newPrediction: Prediction = {
    id: predictions.length + 1,
    ...predictionData,
    timestamp: new Date(),
  };
  predictions.push(newPrediction);
  console.log('Predictions:', predictions); // For debugging
  return newPrediction;
};

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  // Sort by points descending
  const sortedLeaderboard = leaderboard.sort((a, b) => b.points - a.points);
  return sortedLeaderboard;
};