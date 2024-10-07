// navigator.getUserMedia =
//   navigator.mediaDevices.getUserMedia ||
//   navigator.webkitGetUserMedia ||
//   navigator.mozGetUserMedia;
var constraints = {
  audio: false,
  video: {
    width: 720,
    height: 320,
  },
};
var video = document.querySelector('video');
function successCallback(stream) {
  window.stream = stream;
  if ('srcObject' in video) {
    video.srcObject = stream;
  } else {
    video.src = window.URL.createObjectURL(stream);
  }
  video.play();
}
function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(successCallback)
    .catch(errorCallback);
} else {
  console.log('getUserMedia not supported on your browser!');
}
