const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users and messages
const users = new Map();
const messages = [];

// Mock historical data to make chat look realistic
const mockMessages = [
  {
    id: Date.now() - 3600000, // 1 hour ago
    username: 'Sarah',
    message: 'Hey everyone! How\'s the hackathon going?',
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString()
  },
  {
    id: Date.now() - 3500000,
    username: 'Alex',
    message: 'Pretty good! Working on a real-time chat app',
    timestamp: new Date(Date.now() - 3500000).toLocaleTimeString()
  },
  {
    id: Date.now() - 3400000,
    username: 'Mike',
    message: 'That sounds awesome! What tech stack are you using?',
    timestamp: new Date(Date.now() - 3400000).toLocaleTimeString()
  },
  {
    id: Date.now() - 3300000,
    username: 'Sarah',
    message: 'Node.js, Express, and Socket.IO for real-time features',
    timestamp: new Date(Date.now() - 3300000).toLocaleTimeString()
  },
  {
    id: Date.now() - 3200000,
    username: 'Alex',
    message: 'Nice! I\'m using React for the frontend',
    timestamp: new Date(Date.now() - 3200000).toLocaleTimeString()
  },
  {
    id: Date.now() - 3100000,
    username: 'Mike',
    message: 'How\'s the deployment going?',
    timestamp: new Date(Date.now() - 3100000).toLocaleTimeString()
  },
  {
    id: Date.now() - 3000000,
    username: 'Sarah',
    message: 'Deploying to Heroku right now!',
    timestamp: new Date(Date.now() - 3000000).toLocaleTimeString()
  },
  {
    id: Date.now() - 2900000,
    username: 'Alex',
    message: 'Sweet! Can\'t wait to see it live',
    timestamp: new Date(Date.now() - 2900000).toLocaleTimeString()
  }
];

// Initialize with mock data
messages.push(...mockMessages);

function logState(event) {
  console.log(`\n--- ${event} ---`);
  console.log('Current users:', Array.from(users.values()));
  console.log('Current messages:', messages.length);
  console.log('-------------------\n');
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  logState('User connected');

  // Handle user joining
  socket.on('join', (username) => {
    // Check if username is already taken
    const existingUser = Array.from(users.values()).find(user => user === username);
    if (existingUser) {
      socket.emit('error', 'Username already taken');
      return;
    }
    
    users.set(socket.id, username);
    socket.username = username;
    
    console.log(`User ${username} joined.`);
    // Send existing messages to new user
    socket.emit('messageHistory', messages);
    // Notify others that user joined
    socket.broadcast.emit('userJoined', username);
    // Send updated user list to everyone
    io.emit('userList', Array.from(users.values()));
    logState('User joined');
  });

  // Handle new messages
  socket.on('message', (message) => {
    if (!socket.username) {
      console.log('Message ignored - user not joined');
      return;
    }
    const messageObj = {
      id: Date.now() + Math.random(),
      username: socket.username,
      message: message,
      timestamp: new Date().toLocaleTimeString()
    };
    messages.push(messageObj);
    io.emit('message', messageObj);
    console.log(`Message from ${socket.username}: ${message}`);
    logState('Message sent');
    // Keep only last 100 messages
    if (messages.length > 100) {
      messages.splice(0, messages.length - 100);
    }
  });

  // Handle typing indicator
  socket.on('typing', () => {
    if (socket.username) {
      socket.broadcast.emit('typing', socket.username);
    }
  });
  socket.on('stopTyping', () => {
    if (socket.username) {
      socket.broadcast.emit('stopTyping', socket.username);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    if (username) {
      io.emit('userLeft', username);
      io.emit('userList', Array.from(users.values()));
      console.log(`${username} disconnected`);
      logState('User disconnected');
    }
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve test page
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

// Health check endpoint for deployment
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    users: Array.from(users.values()), 
    messageCount: messages.length,
    mockMessages: mockMessages.length,
    realMessages: messages.length - mockMessages.length
  });
});

// API endpoint to get chat stats (useful for deployment monitoring)
app.get('/api/stats', (req, res) => {
  res.json({
    totalMessages: messages.length,
    mockMessages: mockMessages.length,
    realMessages: messages.length - mockMessages.length,
    activeUsers: users.size,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Chat server deployed on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} in your browser`);
  console.log(`🧪 Test page: http://localhost:${PORT}/test`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Stats API: http://localhost:${PORT}/api/stats`);
  console.log(`📝 Loaded ${mockMessages.length} mock messages for realistic chat experience`);
}); 