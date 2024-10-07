const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", function connection(ws) {
    console.log("New client connected");

    ws.onmessage = function incoming(message) {
        let received_msg = JSON.parse(message.data);
       
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(received_msg));
            }
        });
    };

    ws.onclose = function() {
        console.log("Client disconnected");
    };
});
