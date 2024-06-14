import assert from 'assert';
import express from 'express';
import cors from 'cors';
import router from './routes/router';
import config from './config/env.config';

const { EXPRESS_PORT } = config;
let activeRequests: Record<string, AbortController> = {}; // save requests by userId here

// Check env
assert.ok(EXPRESS_PORT, 'Please set env vars!');

const app = express();
app.use(express.json());
app.use(cors());

// Middleware for query save
app.use((req, res, next) => {
  // Get user id from header
  const userId = req.headers['x-user-id'] as string;

  if (userId) {
    // In case userId is already stored - do abort
    if (activeRequests[userId]) {
      console.log(`This userId (${userId}) already exists! Aborting request...`);
      activeRequests[userId].abort();
      return res.status(499).send("Request was cancelled");
    }

    // Otherwise store this userId
    const controller = new AbortController();
    // @ts-ignore
    req.abortController = controller;

    activeRequests[userId] = controller;
  } else {
    return res.status(403).send({ authError: 'unknown user'});
  }

  next();
});

app.get('/', (_req, res) => res.send({ serverHealthOK: true }));
app.use('/api', router);

app.listen(EXPRESS_PORT, () => console.log(`Server started on port ${EXPRESS_PORT}`));

