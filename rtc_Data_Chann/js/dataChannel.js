var sendChannel, receiveChannel;
var startButton = document.getElementById('startButton');
var sendButton = document.getElementById('sendButton');
var closeButton = document.getElementById('closeButton');
startButton.disabled = false;
sendButton.disabled = true;
closeButton.disabled = true;
startButton.onclick = createConnection;
sendButton.onclick = sendData;
closeButton.onclick = closeDataChannels;
function log(text) {
  console.log(
    'At time: ' + (performance.now() / 1000).toFixed(3) + ' --> ' + text
  );
}
function createConnection() {
  // Chrome
  if (navigator.webkitGetUserMedia) {
    RTCPeerConnection = webkitRTCPeerConnection;
    // Firefox
  } else if (navigator.mozGetUserMedia) {
    RTCPeerConnection = mozRTCPeerConnection;
    RTCSessionDescription = mozRTCSessionDescription;
    RTCIceCandidate = mozRTCIceCandidate;
  }
  log('RTCPeerConnection object: ' + RTCPeerConnection);
  var servers = null;
  var pc_constraints = {
    optional: [{ DtlsSrtpKeyAgreement: true }],
  };
  localPeerConnection = new RTCPeerConnection(servers, pc_constraints);
  log('Created local peer connection object, with Data Channel');
  try {
    sendChannel = localPeerConnection.createDataChannel('sendDataChannel', {
      reliable: true,
    });
    log('Created reliable send data channel');
  } catch (e) {
    alert('Failed to create data channel!');
    log('createDataChannel() failed with following message: ' + e.message);
  }
  localPeerConnection.onicecandidate = gotLocalCandidate;
  sendChannel.onopen = handleSendChannelStateChange;
  sendChannel.onclose = handleSendChannelStateChange;
  window.remotePeerConnection = new RTCPeerConnection(servers, pc_constraints);
  log('Created remote peer connection object, with DataChannel');
  remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
  remotePeerConnection.ondatachannel = gotReceiveChannel;
  localPeerConnection.createOffer(gotLocalDescription, onSignalingError);
  startButton.disabled = true;
  closeButton.disabled = false;
}
function onSignalingError(error) {
  console.log('Failed to create signaling message : ' + error.name);
}
function sendData() {
  var data = document.getElementById('dataChannelSend').value;
  sendChannel.send(data);
  log('Sent data: ' + data);
}
function closeDataChannels() {
  log('Closing data channels');
  sendChannel.close();
  log('Closed data channel with label: ' + sendChannel.label);
  receiveChannel.close();
  log('Closed data channel with label: ' + receiveChannel.label);
  localPeerConnection.close();
  remotePeerConnection.close();
  localPeerConnection = null;
  remotePeerConnection = null;
  log('Closed peer connections');
  startButton.disabled = false;
  sendButton.disabled = true;
  closeButton.disabled = true;
  dataChannelSend.value = '';
  dataChannelReceive.value = '';
  dataChannelSend.disabled = true;
  dataChannelSend.placeholder =
    '1: Press Start; 2: Enter text; \
3: Press Send.';
}
function gotLocalDescription(desc) {
  localPeerConnection.setLocalDescription(desc);
  log("localPeerConnection's SDP: \n" + desc.sdp);
  remotePeerConnection.setRemoteDescription(desc);
  remotePeerConnection.createAnswer(gotRemoteDescription, onSignalingError);
}
function gotRemoteDescription(desc) {
  remotePeerConnection.setLocalDescription(desc);
  log("Answer from remotePeerConnection's SDP: \n" + desc.sdp);
  localPeerConnection.setRemoteDescription(desc);
}
function gotLocalCandidate(event) {
  log('local ice callback');
  if (event.candidate) {
    remotePeerConnection.addIceCandidate(event.candidate);
    log('Local ICE candidate: \n' + event.candidate.candidate);
  }
}
function gotRemoteIceCandidate(event) {
  log('remote ice callback');
  if (event.candidate) {
    localPeerConnection.addIceCandidate(event.candidate);
    log('Remote ICE candidate: \n ' + event.candidate.candidate);
  }
}
function gotReceiveChannel(event) {
  log('Receive Channel Callback: event --> ' + event);
  receiveChannel = event.channel;
  receiveChannel.onopen = handleReceiveChannelStateChange;
  receiveChannel.onmessage = handleMessage;
  receiveChannel.onclose = handleReceiveChannelStateChange;
}
function handleMessage(event) {
  log('Received message: ' + event.data);
  document.getElementById('dataChannelReceive').value = event.data;
  document.getElementById('dataChannelSend').value = '';
}
function handleSendChannelStateChange() {
  var readyState = sendChannel.readyState;
  log('Send channel state is: ' + readyState);
  if (readyState == 'open') {
    dataChannelSend.disabled = false;
    dataChannelSend.focus();
    dataChannelSend.placeholder = '';
    sendButton.disabled = false;
    closeButton.disabled = false;
  } else {
    dataChannelSend.disabled = true;
    sendButton.disabled = true;
    closeButton.disabled = true;
  }
}
function handleReceiveChannelStateChange() {
  var readyState = receiveChannel.readyState;
  log('Receive channel state is: ' + readyState);
}
