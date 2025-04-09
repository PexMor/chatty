// Init the browser's own Speech Recognition
var recognition = new webkitSpeechRecognition();

// Tell KITT the command to use to start listening
SpeechKITT.setStartCommand(function () {
  recognition.start();
});

// Tell KITT the command to use to abort listening
SpeechKITT.setAbortCommand(function () {
  recognition.abort();
});

// Register KITT's recognition start event with the browser's Speech Recognition
recognition.addEventListener("start", SpeechKITT.onStart);

// Register KITT's recognition end event with the browser's Speech Recognition
recognition.addEventListener("end", SpeechKITT.onEnd);

// Define a stylesheet for KITT to use
SpeechKITT.setStylesheet(
  "//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/1.0.0/themes/flat.css"
);

// Render KITT's interface
SpeechKITT.vroom(); // SpeechKITT.render() does the same thing, but isn't as much fun!
