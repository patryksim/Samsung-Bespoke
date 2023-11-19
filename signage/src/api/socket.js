import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000');

socket.on('hello', (data) => {
  console.log(data);
});

export default socket;
