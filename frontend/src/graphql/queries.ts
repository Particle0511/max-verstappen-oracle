import { gql } from '@apollo/client';

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    pitStopPrediction {
      predicted_lap
      confidence
    }
    overtakePrediction {
      probability
      target_driver
    }
    leaderboard {
      userId
      name
      points
    }
  }
`;
