import {
  getPitStopPrediction,
  getOvertakePrediction,
  getLeaderboard,
} from '../data-sources';

export const resolvers = {
  Query: {
    pitStopPrediction: () => getPitStopPrediction(),
    overtakePrediction: () => getOvertakePrediction(),
    leaderboard: () => getLeaderboard(),
  },
};
