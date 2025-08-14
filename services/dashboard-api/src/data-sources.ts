import axios from 'axios';

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://oracle-ai-engine';
const GAME_ENGINE_URL = process.env.GAME_ENGINE_URL || 'http://gamification-engine';

export const getPitStopPrediction = async () => {
  const response = await axios.get(`${AI_ENGINE_URL}/predict/pit-stop`);
  return response.data;
};

export const getOvertakePrediction = async () => {
  const response = await axios.get(`${AI_ENGINE_URL}/predict/overtake`);
  return response.data;
};

export const getLeaderboard = async () => {
  const response = await axios.get(`${GAME_ENGINE_URL}/game/leaderboard`);
  return response.data;
};

