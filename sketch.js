document.addEventListener('DOMContentLoaded', function() {
  const video = document.createElement('video');
  video.setAttribute('playsinline', ''); // Important for mobile browsers
  video.muted = true; // Mute the video to allow autoplay on mobile
  const canvas = document.getElementById('captureCanvas');
  const context = canvas.getContext('2d');
  const textInput = document.getElementById('textInput');
  let typing = false;

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        captureFrame(); // Initial frame capture
      });
    })
    .catch(function(error) {
      console.error("Error accessing the webcam: ", error);
    });

  function captureFrame() {
    if (typing || !textInput.value) { // Capture frame if typing or text input is empty
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  }

  // For mobile devices, consider touch events or a timer to periodically check for input
  textInput.addEventListener('input', function() {
    typing = true;
    captureFrame();
    setTimeout(() => { typing = false; }, 500); // Reset typing status after a delay
  });

  // Optional: To handle fast typing or ensure updates on mobile, run captureFrame at intervals
  setInterval(captureFrame, 500);
});
