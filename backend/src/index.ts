import 'dotenv/config';
import express from "express";
import { createServer } from "node:http";
import announcementRoutes from "./routes/announcements.js"

const app = express();
// We need to create an HTTP server manually to attach Socket.io to it
const server = createServer(app);

// Middleware
app.use(express.json());

// Initialize WebSockets
// initSocket(server);

// Register Routes
app.use('/api/announcements', announcementRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Announcements API is running...');
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});