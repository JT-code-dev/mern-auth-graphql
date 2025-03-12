import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authenticateToken } from './services/auth.js'; 
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// 🔧 Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    mongoose.connect(process.env.MONGODB_URI!)
        .then(() => console.log('📚 Connected to MongoDB'));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
}

startServer();
