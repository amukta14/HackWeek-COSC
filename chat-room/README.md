# Real-Time Chat Room

Real-time chat app built with Node.js, Express, and Socket.IO.

## Live Demo

**[Try it live on Render](https://chatroom-dewd.onrender.com)**

## Quick Start

```bash
cd chat-room
npm install
npm start
```

Open http://localhost:3000

## Features

- Real-time messaging
- User join/leave notifications  
- Typing indicators
- Message history
- Multiple users support
- Modern UI

## Test Multiple Users

Open multiple tabs at http://localhost:3000 - each gets a unique username.

## Deploy

Ready for Render, Railway, Heroku, or Vercel. Set root directory to `chat-room`.

**Deployed on Render** - [Live Demo](https://chatroom-dewd.onrender.com)

## API Endpoints

- `GET /` - Main chat interface
- `GET /test` - Test page for multiple users
- `GET /health` - Health check endpoint

## Environment Variables

- `PORT` - Server port (default: 3000)

## Technologies Used

- Node.js
- Express.js
- Socket.IO
- HTML5
- CSS3
- Vanilla JavaScript

## Usage

- Enter username to join chat
- Type messages and press Enter to send
- View online users in sidebar
- See typing indicators
- Click Leave to disconnect

## Tech Stack

- Backend: Node.js, Express
- Real-time: Socket.IO
- Frontend: HTML, CSS, JavaScript

## Project Structure

```
chat-room/
├── server.js          # Main server with Socket.IO
├── package.json       # Dependencies
├── README.md         # This file
└── public/           # Client files
    ├── index.html    # Main page
    ├── style.css     # Styling
    └── script.js     # Client logic
```

## License

MIT License 