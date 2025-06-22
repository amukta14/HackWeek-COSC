# Real-Time Chat Room

A real-time chat application built with Node.js, Express, and Socket.IO.

## Features

- Real-time messaging
- User join/leave notifications
- Typing indicators
- Message history
- Multiple users support
- Modern UI with animations
- Works with multiple tabs in one browser

## Installation

1. Navigate to the chat-room directory:
   ```bash
   cd chat-room
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally

Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Testing Multiple Users

1. Open http://localhost:3000 in your browser
2. Open multiple tabs of the same URL
3. Each tab will auto-generate a unique username
4. Start chatting between tabs!

## Deployment

### Heroku
1. Create a new Heroku app
2. Connect your repository
3. Deploy with: `git push heroku main`
4. The app will use `process.env.PORT` automatically

### Railway
1. Connect your GitHub repository
2. Railway will auto-detect Node.js and deploy
3. Environment variables are handled automatically

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the chat-room directory
3. Follow the prompts

### Render
1. Create a new Web Service
2. Connect your repository
3. Set build command: `npm install`
4. Set start command: `npm start`

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