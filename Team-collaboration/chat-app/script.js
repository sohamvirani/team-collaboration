const socket = io('http://localhost:5000');
const loginDiv = document.getElementById('login');
const chatDiv = document.getElementById('chat');
const messagesList = document.getElementById('messages');
const usernameInput = document.getElementById('username');
const loginBtn = document.getElementById('loginBtn');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');

loginBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    if (username) {
        socket.emit('user_login', username);
        loginDiv.style.display = 'none';
        chatDiv.style.display = 'block';
    }
});

sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.emit('chat_message', { user: usernameInput.value, message });
        messageInput.value = '';
    }
});

socket.on('chat_message', (data) => {
    const li = document.createElement('li');
    li.textContent = `${data.user}: ${data.message}`;
    messagesList.appendChild(li);
});
