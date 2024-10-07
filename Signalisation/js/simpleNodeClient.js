var div = document.getElementById('scratchPad');
var socket = io.connect('http://localhost:8181');
var channel = prompt('Enter signaling channel name:');
if (channel !== '') {
  console.log('Trying to create or join channel: ', channel);
  socket.emit('create or join', channel);
}
socket.on('created', function (channel) {
  console.log('channel ' + channel + ' has been created!');
  console.log('This peer is the initiator...');
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p>Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> Channel ' +
      channel +
      ' has been created! </p>'
  );
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p>Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> This peer is the initiator...</p>'
  );
});
socket.on('full', function (channel) {
  console.log(
    'channel ' +
      channel +
      ' is too crowded! \
    Cannot allow you to enter, sorry :-('
  );
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p>Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> \
    channel ' +
      channel +
      ' is too crowded! \
    Cannot allow you to enter, sorry :-( </p>'
  );
});
socket.on('remotePeerJoining', function (channel) {
  console.log('Request to join ' + channel);
  console.log('You are the initiator!');
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p style="color:red">Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> Message from server: request to join channel ' +
      channel +
      '</p>'
  );
});
socket.on('joined', function (msg) {
  console.log('Message from server: ' + msg);
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p>Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> Message from server: </p>'
  );
  div.insertAdjacentHTML('beforeEnd', '<p style="color:blue">' + msg + '</p>');
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p>Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> Message from server: </p>'
  );
  div.insertAdjacentHTML('beforeEnd', '<p style="color:blue">' + msg + '</p>');
});
socket.on('broadcast: joined', function (msg) {
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p style="color:red">Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> Broadcast message from server: </p>'
  );
  div.insertAdjacentHTML('beforeEnd', '<p style="color:red">' + msg + '</p>');
  console.log('Broadcast message from server: ' + msg);
  var myMessage = prompt('Insert message to be sent to your peer:', '');
  socket.emit('message', {
    channel: channel,
    message: myMessage,
  });
});
socket.on('log', function (array) {
  console.log.apply(console, array);
});
socket.on('message', function (message) {
  console.log('Got message from other peer: ' + message);
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p>Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> Got message from other peer: </p>'
  );
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p style="color:blue">' + message + '</p>'
  );
  var myResponse = prompt('Send response to other peer:', '');
  socket.emit('response', {
    channel: channel,
    message: myResponse,
  });
});
socket.on('response', function (response) {
  console.log('Got response from other peer: ' + response);
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p>Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> Got response from other peer: </p>'
  );
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p style="color:blue">' + response + '</p>'
  );
  var chatMessage = prompt(
    'Keep on chatting.Write "Bye" to quit conversation',
    ''
  );
  if (chatMessage == 'Bye') {
    div.insertAdjacentHTML(
      'beforeEnd',
      '<p>Time: '(performance.now() / 1000).toFixed(3) +
        ' --> Sending "Bye" to server...</p>'
    );
    console.log('Sending "Bye" to server');
    socket.emit('Bye', channel);
    div.insertAdjacentHTML(
      'beforeEnd',
      '<p>Time: ' +
        (performance.now() / 1000).toFixed(3) +
        ' --> Going to disconnect...</p>'
    );
    console.log('Going to disconnect...');
    socket.disconnect();
  } else {
    socket.emit('response', {
      channel: channel,
      message: chatMessage,
    });
  }
});
socket.on('Bye', function () {
  console.log('Got "Bye" from other peer! Going to disconnect...');
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p>Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> Got "Bye" from other peer!</p>'
  );
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p>Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> Sending "Ack" to server</p>'
  );
  console.log('Sending "Ack" to server');
  socket.emit('Ack');
  div.insertAdjacentHTML(
    'beforeEnd',
    '<p>Time: ' +
      (performance.now() / 1000).toFixed(3) +
      ' --> Going to disconnect...</p>'
  );
  console.log('Going to disconnect...');
  socket.disconnect();
});
