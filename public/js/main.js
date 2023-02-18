// imports go at the top
import ChatMsg from './components/ChatMessage.js';
import TypeMsg from './components/TypingMessage.js';

var socket = io();

// utility functions for socket
function addNewMessage(message) {
  
    vm.messages.push(message);
}

function setUserID ({ sID }) {
  vm.socketID = sID;
}

function handleTypingEvent(user) {
  console.log('someone is typing...');
}

const { createApp } = Vue

const vm = createApp({
  data() {
    return {
      socketID: '',
      message: '',
      messages: [],
      username: '',
      typing: 'Is Typing...',
    }
  },

  methods: {
        dispatchMessage() {
           console.log('send a message to the chat service');

          socket.emit('chat_message', {
          content: this.message, 
          user: this.username || 'Anonymous',
          id: this.socketID
          });

           this.message = '';
        },

        dispatchTypingEvent() {

          // This will bring the "is typing stuff up on screen when you click on the box"
          socket.emit('typing_event', {user: this.username || 'Anonymous'})

          socket.emit('chat_message', {
            content: this.typing, 
            user: this.username || 'Anonymous',
            });
        }

  },

  components: {
    newmsg: ChatMsg,
    newType: TypeMsg
  }


}).mount('#app')

socket.addEventListener('connected', setUserID);
socket.addEventListener('new_message', addNewMessage);
socket.addEventListener('new_typing', handleTypingEvent);

