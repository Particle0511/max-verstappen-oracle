import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { WebSocketServer } from 'ws';
import http from 'http';
import cors from 'cors';
import faker from 'faker';

async function startServer() {
  // --- 1. SETUP EXPRESS AND HTTP SERVER ---
  const app = express();
  const httpServer = http.createServer(app);
  app.use(cors());
  app.use(express.json());

  // --- 2. DYNAMIC SIMULATION STATE ---
  let currentLap = 25;
  const leaderboard = [
    { userId: 1, name: 'MaxFan01', points: 150 },
    { userId: 2, name: 'SuperMax', points: 125 },
    { userId: 3, name: 'DutchLion', points: 110 },
  ];
  const tyreCompounds = ["Soft", "Medium", "Hard"];
  let currentTyre = "Medium";

  // --- 3. TELEMETRY WEBSOCKET SERVER ---
  const wss = new WebSocketServer({ server: httpServer, path: '/telemetry' });

  const generateTelemetryData = () => ({
    timestamp: faker.date.recent().toISOString(),
    driver: "Max Verstappen",
    car_data: {
      speed: faker.datatype.number({ min: 150, max: 350 }),
      rpm: faker.datatype.number({ min: 9000, max: 12500 }),
      gear: faker.datatype.number({ min: 1, max: 8 }),
      throttle: parseFloat(faker.datatype.float({ min: 0, max: 1 }).toFixed(2)),
      brake: parseFloat(faker.datatype.float({ min: 0, max: 1 }).toFixed(2)),
      drs_enabled: faker.datatype.boolean(),
    },
    lap_data: {
      current_lap: currentLap,
      lap_time: parseFloat(faker.datatype.float({ min: 88, max: 92 }).toFixed(3)),
      sector: faker.datatype.number({ min: 1, max: 3 }),
    },
    tyre_data: {
      compound: currentTyre,
      wear_level: parseFloat(faker.datatype.float({ min: 0.1, max: 0.6 }).toFixed(2)),
    }
  });

  wss.on('connection', (ws) => {
    console.log('Frontend connected to telemetry feed');
    
    // Use 'any' type to bypass strict type checking for timers
    let telemetryInterval: any;
    let lapInterval: any;
    let leaderboardInterval: any;

    telemetryInterval = setInterval(() => {
      ws.send(JSON.stringify(generateTelemetryData()));
    }, 100);

    lapInterval = setInterval(() => {
      currentLap++;
      if (currentLap % 15 === 0) {
        currentTyre = faker.random.arrayElement(tyreCompounds);
        console.log(`Pit Stop! Switched to ${currentTyre} tyres.`);
      }
      if (currentLap > 58) {
        currentLap = 1;
      }
    }, 90000);

    leaderboardInterval = setInterval(() => {
        leaderboard.forEach(player => {
            player.points += faker.datatype.number({min: 0, max: 5});
        });
    }, 5000);

    ws.on('close', () => {
      console.log('Frontend disconnected');
      clearInterval(telemetryInterval);
      clearInterval(lapInterval);
      clearInterval(leaderboardInterval);
    });
  });

  // --- 4. GRAPHQL API SERVER ---
  const typeDefs = `#graphql
    type Query {
      pitStopPrediction: PitStopPrediction
      overtakePrediction: OvertakePrediction
      leaderboard: [LeaderboardEntry]
    }
    type PitStopPrediction { predicted_lap: Int, confidence: Float, strategy_name: String }
    type OvertakePrediction { probability: Float, target_driver: String, on_lap: Int }
    type LeaderboardEntry { userId: Int, name: String, points: Int }
  `;

  const resolvers = {
    Query: {
      pitStopPrediction: () => ({
        predicted_lap: currentLap + faker.datatype.number({ min: 5, max: 10 }),
        confidence: parseFloat(faker.datatype.float({ min: 0.75, max: 0.95 }).toFixed(2)),
        strategy_name: "Optimal One-Stop"
      }),
      overtakePrediction: () => ({
        probability: parseFloat(faker.datatype.float({ min: 0.6, max: 0.85 }).toFixed(2)),
        target_driver: faker.random.arrayElement(["Leclerc", "Hamilton", "Norris"]),
        on_lap: currentLap + 1
      }),
      leaderboard: () => {
        return [...leaderboard].sort((a, b) => b.points - a.points);
      },
    },
  };

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();

  app.use('/graphql', expressMiddleware(apolloServer));

  // --- 5. START THE SERVER ---
  const PORT = 8080;
  httpServer.listen(PORT, () => {
    console.log(`🚀 All-in-one server ready!`);
    console.log(`  - Telemetry WebSocket running on ws://localhost:${PORT}/telemetry`);
    console.log(`  - GraphQL API running on http://localhost:${PORT}/graphql`);
  });
}

startServer();
