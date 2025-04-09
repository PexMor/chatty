const artyom = new Artyom();

let UserDictation = artyom.newDictation({
  continuous: true, // Enable continuous if HTTPS connection
  onResult: function (text) {
    // Do something with the text
    console.log(text);
    let elRes = document.getElementById("result");
    if (elRes) {
      elRes.innerHTML += text + "<br/>";
    } else {
      console.error("Element with ID 'result' not found.");
    }
  },
  onStart: function () {
    console.log("Dictation started by the user");
  },
  onEnd: function () {
    alert("Dictation stopped by the user");
  },
});

window.addEventListener("load", function () {
  let elStart = document.getElementById("start-button");
  let elStop = document.getElementById("stop-button");
  if (elStart) {
    elStart.addEventListener("click", function () {
      UserDictation.start();
    });
  } else {
    console.error("Element with ID 'start-button' not found.");
  }
  if (elStop) {
    elStop.addEventListener("click", function () {
      UserDictation.stop();
    });
  } else {
    console.error("Element with ID 'stop-button' not found.");
  }
});

// UserDictation.start();

// Stop whenever you want
// UserDictation.stop();
