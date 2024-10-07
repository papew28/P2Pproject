const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log('A new client connected.');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(message);
  });

  //   ws.send('Hello! Connection established.');
});

console.log('WebSocket server is running on ws://localhost:3000/');
