// If you modify this array, also update default language / dialect below.
var langs = [
  ["Afrikaans", ["af-ZA"]],
  ["አማርኛ", ["am-ET"]],
  ["Azərbaycanca", ["az-AZ"]],
  ["বাংলা", ["bn-BD", "বাংলাদেশ"], ["bn-IN", "ভারত"]],
  ["Bahasa Indonesia", ["id-ID"]],
  ["Bahasa Melayu", ["ms-MY"]],
  ["Català", ["ca-ES"]],
  ["Čeština", ["cs-CZ"]],
  ["Dansk", ["da-DK"]],
  ["Deutsch", ["de-DE"]],
  [
    "English",
    ["en-AU", "Australia"],
    ["en-CA", "Canada"],
    ["en-IN", "India"],
    ["en-KE", "Kenya"],
    ["en-TZ", "Tanzania"],
    ["en-GH", "Ghana"],
    ["en-NZ", "New Zealand"],
    ["en-NG", "Nigeria"],
    ["en-ZA", "South Africa"],
    ["en-PH", "Philippines"],
    ["en-GB", "United Kingdom"],
    ["en-US", "United States"],
  ],
  [
    "Español",
    ["es-AR", "Argentina"],
    ["es-BO", "Bolivia"],
    ["es-CL", "Chile"],
    ["es-CO", "Colombia"],
    ["es-CR", "Costa Rica"],
    ["es-EC", "Ecuador"],
    ["es-SV", "El Salvador"],
    ["es-ES", "España"],
    ["es-US", "Estados Unidos"],
    ["es-GT", "Guatemala"],
    ["es-HN", "Honduras"],
    ["es-MX", "México"],
    ["es-NI", "Nicaragua"],
    ["es-PA", "Panamá"],
    ["es-PY", "Paraguay"],
    ["es-PE", "Perú"],
    ["es-PR", "Puerto Rico"],
    ["es-DO", "República Dominicana"],
    ["es-UY", "Uruguay"],
    ["es-VE", "Venezuela"],
  ],
  ["Euskara", ["eu-ES"]],
  ["Filipino", ["fil-PH"]],
  ["Français", ["fr-FR"]],
  ["Basa Jawa", ["jv-ID"]],
  ["Galego", ["gl-ES"]],
  ["ગુજરાતી", ["gu-IN"]],
  ["Hrvatski", ["hr-HR"]],
  ["IsiZulu", ["zu-ZA"]],
  ["Íslenska", ["is-IS"]],
  ["Italiano", ["it-IT", "Italia"], ["it-CH", "Svizzera"]],
  ["ಕನ್ನಡ", ["kn-IN"]],
  ["ភាសាខ្មែរ", ["km-KH"]],
  ["Latviešu", ["lv-LV"]],
  ["Lietuvių", ["lt-LT"]],
  ["മലയാളം", ["ml-IN"]],
  ["मराठी", ["mr-IN"]],
  ["Magyar", ["hu-HU"]],
  ["ລາວ", ["lo-LA"]],
  ["Nederlands", ["nl-NL"]],
  ["नेपाली भाषा", ["ne-NP"]],
  ["Norsk bokmål", ["nb-NO"]],
  ["Polski", ["pl-PL"]],
  ["Português", ["pt-BR", "Brasil"], ["pt-PT", "Portugal"]],
  ["Română", ["ro-RO"]],
  ["සිංහල", ["si-LK"]],
  ["Slovenščina", ["sl-SI"]],
  ["Basa Sunda", ["su-ID"]],
  ["Slovenčina", ["sk-SK"]],
  ["Suomi", ["fi-FI"]],
  ["Svenska", ["sv-SE"]],
  ["Kiswahili", ["sw-TZ", "Tanzania"], ["sw-KE", "Kenya"]],
  ["ქართული", ["ka-GE"]],
  ["Հայերեն", ["hy-AM"]],
  [
    "தமிழ்",
    ["ta-IN", "இந்தியா"],
    ["ta-SG", "சிங்கப்பூர்"],
    ["ta-LK", "இலங்கை"],
    ["ta-MY", "மலேசியா"],
  ],
  ["తెలుగు", ["te-IN"]],
  ["Tiếng Việt", ["vi-VN"]],
  ["Türkçe", ["tr-TR"]],
  ["اُردُو", ["ur-PK", "پاکستان"], ["ur-IN", "بھارت"]],
  ["Ελληνικά", ["el-GR"]],
  ["български", ["bg-BG"]],
  ["Русский", ["ru-RU"]],
  ["Српски", ["sr-RS"]],
  ["Українська", ["uk-UA"]],
  ["한국어", ["ko-KR"]],
  [
    "中文",
    ["cmn-Hans-CN", "普通话 (中国大陆)"],
    ["cmn-Hans-HK", "普通话 (香港)"],
    ["cmn-Hant-TW", "中文 (台灣)"],
    ["yue-Hant-HK", "粵語 (香港)"],
  ],
  ["日本語", ["ja-JP"]],
  ["हिन्दी", ["hi-IN"]],
  ["ภาษาไทย", ["th-TH"]],
];

for (var i = 0; i < langs.length; i++) {
  select_language.options[i] = new Option(langs[i][0], i);
}
// Set default language / dialect.
select_language.selectedIndex = 10;
updateCountry();
select_dialect.selectedIndex = 11;
showInfo("info_start");

function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? "hidden" : "visible";
}

var create_email = false;
var final_transcript = "";
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!("webkitSpeechRecognition" in window)) {
  upgrade();
} else {
  start_button.style.display = "inline-block";
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function () {
    recognizing = true;
    showInfo("info_speak_now");
    start_img.src =
      "/intl/en/chrome/assets/common/images/content/mic-animate.gif";
  };

  recognition.onerror = function (event) {
    if (event.error == "no-speech") {
      start_img.src = "/intl/en/chrome/assets/common/images/content/mic.gif";
      showInfo("info_no_speech");
      ignore_onend = true;
    }
    if (event.error == "audio-capture") {
      start_img.src = "/intl/en/chrome/assets/common/images/content/mic.gif";
      showInfo("info_no_microphone");
      ignore_onend = true;
    }
    if (event.error == "not-allowed") {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo("info_blocked");
      } else {
        showInfo("info_denied");
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function () {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = "/intl/en/chrome/assets/common/images/content/mic.gif";
    if (!final_transcript) {
      showInfo("info_start");
      return;
    }
    showInfo("");
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById("final_span"));
      window.getSelection().addRange(range);
    }
    if (create_email) {
      create_email = false;
      createEmail();
    }
  };

  recognition.onresult = function (event) {
    var interim_transcript = "";
    if (typeof event.results == "undefined") {
      recognition.onend = null;
      recognition.stop();
      upgrade();
      return;
    }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript) {
      showButtons("inline-block");
    }
  };
}

function upgrade() {
  start_button.style.visibility = "hidden";
  showInfo("info_upgrade");
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, "<p></p>").replace(one_line, "<br>");
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function (m) {
    return m.toUpperCase();
  });
}

function createEmail() {
  var n = final_transcript.indexOf("\n");
  if (n < 0 || n >= 80) {
    n = 40 + final_transcript.substring(40).indexOf(" ");
  }
  var subject = encodeURI(final_transcript.substring(0, n));
  var body = encodeURI(final_transcript.substring(n + 1));
  window.location.href = "mailto:?subject=" + subject + "&body=" + body;
}

function copyButton() {
  if (recognizing) {
    recognizing = false;
    recognition.stop();
  }
  copy_button.style.display = "none";
  copy_info.style.display = "inline-block";
  showInfo("");
}

function emailButton() {
  if (recognizing) {
    create_email = true;
    recognizing = false;
    recognition.stop();
  } else {
    createEmail();
  }
  email_button.style.display = "none";
  email_info.style.display = "inline-block";
  showInfo("");
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = "";
  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = "";
  interim_span.innerHTML = "";
  start_img.src = "/intl/en/chrome/assets/common/images/content/mic-slash.gif";
  showInfo("info_allow");
  showButtons("none");
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? "inline" : "none";
      }
    }
    info.style.visibility = "visible";
  } else {
    info.style.visibility = "hidden";
  }
}

var current_style;
function showButtons(style) {
  if (style == current_style) {
    return;
  }
  current_style = style;
  copy_button.style.display = style;
  email_button.style.display = style;
  copy_info.style.display = "none";
  email_info.style.display = "none";
}
