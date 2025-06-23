const io = require('socket.io-client');

// Test multiple users connecting and messaging
function testUser(username) {
    const socket = io('http://localhost:3000');
    
    socket.on('connect', () => {
        console.log(`${username} connected`);
        socket.emit('join', username);
    });
    
    socket.on('messageHistory', (messages) => {
        console.log(`${username} received ${messages.length} message history`);
    });
    
    socket.on('message', (message) => {
        console.log(`${username} received: ${message.username}: ${message.message}`);
    });
    
    socket.on('userJoined', (user) => {
        console.log(`${username} sees ${user} joined`);
    });
    
    socket.on('userLeft', (user) => {
        console.log(`${username} sees ${user} left`);
    });
    
    socket.on('userList', (users) => {
        console.log(`${username} sees users:`, users);
    });
    
    // Send a message after 2 seconds
    setTimeout(() => {
        socket.emit('message', `Hello from ${username}!`);
    }, 2000);
    
    return socket;
}

// Test with 5 users using the requested names
console.log('Starting multi-user test with Amukta, Maithili, Sneha, Trey, and Aparna...');
const amukta = testUser('Amukta');
const maithili = testUser('Maithili');
const sneha = testUser('Sneha');
const trey = testUser('Trey');
const aparna = testUser('Aparna');

// Cleanup after 15 seconds
setTimeout(() => {
    console.log('Test completed');
    amukta.disconnect();
    maithili.disconnect();
    sneha.disconnect();
    trey.disconnect();
    aparna.disconnect();
    process.exit(0);
}, 15000); 