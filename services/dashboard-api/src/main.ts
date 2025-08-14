import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from 'fs';
import { resolvers } from './graphql/resolvers';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 80;

const typeDefs = readFileSync(path.join(__dirname, './graphql/schema.graphql'), 'utf-8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server));

  app.get('/', (req, res) => {
    res.send({ status: 'Dashboard API is running' });
  });

  app.listen(PORT, () => {
    console.log(`Dashboard API listening on port ${PORT}`);
  });
}

startServer();