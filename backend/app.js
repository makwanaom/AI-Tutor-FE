import express from 'express';
import { json } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const app = express();

import getAllUsers from './Controllers/getAllUsers.js';
import postUser from './Controllers/postUser.js';
import getHome from './Controllers/getHome.js';
import postMessage from './Controllers/postMessage.js';

app.use(cors()); // Enable CORS for all routes
app.use(json());

app.get('/users', getAllUsers);
app.post('/users', postUser);
app.get('/', getHome);
app.post('/send', postMessage);
app.post('/explain', async (req, res) => {
  const topic = req.body.topic; // Get the topic index from the request
  try {
    const detailedExplanation = await explainTopic(topic, client);
    res.status(200).json({ detailedExplanation });
    console.log(detailedExplanation);
  } catch (error) {
    console.error("Error explaining topic:", error);
    res.status(500).json({ error: "Failed to explain topic" });
  }
});

export default app;

