// Connect to Socket.IO server
const socket = io();

let currentUser = '';
let isTyping = false;
let typingTimeout;

// DOM elements
const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');
const usernameInput = document.getElementById('usernameInput');
const joinBtn = document.getElementById('joinBtn');
const leaveBtn = document.getElementById('leaveBtn');
const currentUserSpan = document.getElementById('currentUser');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const userList = document.getElementById('userList');
const typingIndicator = document.getElementById('typingIndicator');

// Generate unique username for each tab
function generateUniqueUsername() {
    const adjectives = ['Happy', 'Clever', 'Brave', 'Wise', 'Swift', 'Bright', 'Calm', 'Eager', 'Friendly', 'Gentle'];
    const nouns = ['Panda', 'Tiger', 'Eagle', 'Dolphin', 'Lion', 'Wolf', 'Bear', 'Fox', 'Owl', 'Deer'];
    const randomNum = Math.floor(Math.random() * 1000);
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adjective}${noun}${randomNum}`;
}

// Initialize with unique username
usernameInput.value = generateUniqueUsername();

// Join chat functionality
joinBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        console.log('Joining chat as:', username);
        socket.emit('join', username);
        showChatScreen();
    }
});

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinBtn.click();
    }
});

// Leave chat functionality
leaveBtn.addEventListener('click', () => {
    console.log('Leaving chat');
    socket.disconnect();
    showLoginScreen();
    clearMessages();
    clearUserList();
});

// Send message functionality
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Typing indicator
messageInput.addEventListener('input', () => {
    if (!isTyping) {
        isTyping = true;
        socket.emit('typing');
    }
    
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        isTyping = false;
        socket.emit('stopTyping');
    }, 1000);
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message && currentUser) {
        console.log('Sending message:', message);
        socket.emit('message', message);
        messageInput.value = '';
        socket.emit('stopTyping');
        
        // Add visual feedback
        sendBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            sendBtn.style.transform = 'translateY(-2px)';
        }, 100);
    }
}

// Socket event handlers
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('messageHistory', (messages) => {
    console.log('Received message history:', messages.length, 'messages');
    messages.forEach(message => {
        addMessage(message);
    });
    scrollToBottom();
});

socket.on('message', (message) => {
    console.log('Received new message:', message);
    addMessage(message, true); // true for new message animation
    scrollToBottom();
});

socket.on('userJoined', (username) => {
    console.log('User joined:', username);
    addSystemMessage(`${username} joined the chat`);
});

socket.on('userLeft', (username) => {
    console.log('User left:', username);
    addSystemMessage(`${username} left the chat`);
});

socket.on('userList', (users) => {
    console.log('Updated user list:', users);
    updateUserList(users);
});

socket.on('typing', (username) => {
    if (username !== currentUser) {
        typingIndicator.textContent = `${username} is typing...`;
        typingIndicator.style.opacity = '1';
    }
});

socket.on('stopTyping', () => {
    typingIndicator.style.opacity = '0';
    setTimeout(() => {
        typingIndicator.textContent = '';
    }, 300);
});

socket.on('error', (error) => {
    alert(error);
    // Generate new unique username if current one is taken
    usernameInput.value = generateUniqueUsername();
});

// UI functions
function showChatScreen() {
    loginScreen.style.opacity = '0';
    loginScreen.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        loginScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
        chatScreen.style.opacity = '0';
        chatScreen.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            chatScreen.style.opacity = '1';
            chatScreen.style.transform = 'translateY(0)';
        }, 50);
        
        currentUserSpan.textContent = currentUser;
        messageInput.focus();
    }, 300);
}

function showLoginScreen() {
    chatScreen.style.opacity = '0';
    chatScreen.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        chatScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        loginScreen.style.opacity = '1';
        loginScreen.style.transform = 'translateY(0)';
        
        usernameInput.value = '';
        currentUser = '';
    }, 300);
}

function addMessage(message, isNew = false) {
    console.log('Adding message to UI:', message);
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.username === currentUser ? 'own' : 'other'}`;
    
    if (isNew) {
        messageDiv.classList.add('new');
    }
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="username">${message.username}</span>
            <span class="timestamp">${message.timestamp}</span>
        </div>
        <div class="message-content">${escapeHtml(message.message)}</div>
    `;
    
    messagesDiv.appendChild(messageDiv);
    console.log(`Message added to UI. Total messages in UI: ${messagesDiv.children.length}`);
    
    // Remove new class after animation
    if (isNew) {
        setTimeout(() => {
            messageDiv.classList.remove('new');
        }, 600);
    }
}

function addSystemMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'system-message';
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
}

function updateUserList(users) {
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        if (user === currentUser) {
            li.style.fontWeight = 'bold';
            li.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            li.style.color = 'white';
        }
        userList.appendChild(li);
    });
}

function clearMessages() {
    messagesDiv.innerHTML = '';
}

function clearUserList() {
    userList.innerHTML = '';
}

function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Auto-scroll to bottom when new messages arrive
const messagesContainer = document.getElementById('messages');
const observer = new MutationObserver(() => {
    scrollToBottom();
});

observer.observe(messagesContainer, {
    childList: true,
    subtree: true
});

// Add smooth transitions
document.addEventListener('DOMContentLoaded', () => {
    // Add transition styles
    loginScreen.style.transition = 'all 0.3s ease';
    chatScreen.style.transition = 'all 0.3s ease';
    typingIndicator.style.transition = 'opacity 0.3s ease';
    
    // Focus on username input
    usernameInput.focus();
});

// Auto-join after a short delay (for convenience)
setTimeout(() => {
    if (!currentUser) {
        joinBtn.click();
    }
}, 1000); 