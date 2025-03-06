import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import { typeDefs } from './schemas/typeDefs.js';
import { resolvers } from './schemas/resolvers.js';
import authMiddleware from './services/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Static file serving for production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => authMiddleware({ req }),
});

async function startServer() {
    console.log('🚀 Starting Apollo Server...');
    await server.start();
    server.applyMiddleware({ app });

    mongoose.connect(process.env.MONGODB_URI!)
        .then(() => console.log('📚 Connected to MongoDB'));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });

    app.use((_req, res) => {
        res.status(404).send('Not Found - Try /graphql');
    });
}

startServer();
