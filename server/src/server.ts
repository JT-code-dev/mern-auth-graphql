import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authenticateToken } from './services/auth.js';

// Load environment variables
dotenv.config();

const app = express();

// ✅ Configure CORS properly
app.use(cors({
  origin: ['https://mern-auth-graphql.onrender.com'], // ✅ Replace with your frontend Render URL
  credentials: true, // ✅ Allow cookies & authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ✅ Allow required HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // ✅ Allow headers needed for GraphQL auth
}));

app.use(express.json());

// Removed Static File Serving - Frontend is hosted separately

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startServer() {
    await server.start();

    app.use(
        '/graphql',
        expressMiddleware(server, {
            context: async ({ req }) => {
                const user = authenticateToken(req); // Get user from token
                return { user }; // Provide user to resolvers
            },
        })
    );

    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('📚 Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
    }

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at https://googlebooks-backend.onrender.com/graphql`);
    });
}

// Start the server
startServer();
