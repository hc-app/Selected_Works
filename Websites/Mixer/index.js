//Drumpad Data
let drum_audioDisplayKey = {
  Q: {
    keyPressed: "q",
    id: "drum-q",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    display: "Heater 1",
  },
  W: {
    keyPressed: "w",
    id: "drum-w",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    display: "Heater 2",
  },
  E: {
    keyPressed: "e",
    id: "drum-e",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    display: "Heater 3",
  },
  A: {
    keyPressed: "a",
    id: "drum-a",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    display: "Heater 4",
  },
  S: {
    keyPressed: "s",
    id: "drum-s",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    display: "Clap",
  },
  D: {
    keyPressed: "d",
    id: "drum-d",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    display: "Open-HH",
  },
  Z: {
    keyPressed: "z",
    id: "drum-z",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    display: "Kick-n'-Hat",
  },
  X: {
    keyPressed: "x",
    id: "drum-x",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    display: "Kick",
  },
  C: {
    keyPressed: "c",
    id: "drum-c",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    display: "Closed-HH",
  },
};

let bank_audioDisplayKey = {
  Q: {
    keyPressed: "q",
    id: "bank-q",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    display: "Chord 1",
  },
  W: {
    keyPressed: "w",
    id: "bank-w",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    display: "Chord 2",
  },
  E: {
    keyPressed: "e",
    id: "bank-e",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    display: "Chord 3",
  },
  A: {
    keyPressed: "a",
    id: "bank-a",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    display: "Shaker",
  },
  S: {
    keyPressed: "s",
    id: "bank-s",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    display: "Open HH",
  },
  D: {
    keyPressed: "d",
    id: "bank-d",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    display: "Closed HH",
  },
  Z: {
    keyPressed: "z",
    id: "bank-z",
    src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    display: "Punchy Kick",
  },
  X: {
    keyPressed: "x",
    id: "bank-x",
    src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    display: "Side Stick",
  },
  C: {
    keyPressed: "c",
    id: "bank-c",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    display: "Snare",
  },
};

//State variables
let power = "on";
let display = "";
let volume = "50";
let bank = "off";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Settings section
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Power toggle button
let powerCheckbox = document.getElementById("power-checkbox");
powerCheckbox.addEventListener("change", function (e) {
  if (this.checked) {
    power = "on";
    updateAudio();
    updateDisplay(e);
    document.getElementById("bank-checkbox").disabled = false;
  } else {
    power = "off";
    updateAudio();
    updateDisplay(e);
    document.getElementById("bank-checkbox").checked = false;
    document.getElementById("bank-checkbox").disabled = true;
    bank = "off";
  }
});

//Bank toggle button
let bankCheckbox = document.getElementById("bank-checkbox");
bankCheckbox.addEventListener("change", function (e) {
  if (this.checked) {
    bank = "on";
    updateAudio();
    updateDisplay(e);
  } else {
    bank = "off";
    updateAudio();
    updateDisplay(e);
  }
});

//Volume Slider
let volumeSlider = document.getElementById("volume-slider");
volumeSlider.addEventListener("input", function (e) {
  volume = this.value;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Drumpad Section
////////////////////////////////////////////////////////////////////////////////////////////////////////////
for (let elementID in drum_audioDisplayKey) {
  let drumpad = document.getElementById(elementID + "-button");

  //Drumpad button mousedown eventlistener
  drumpad.addEventListener("mousedown", function (e) {
    updateDisplay(e);
    playSound(e);
  });

  drumpad.addEventListener("mousedown", function (e) {
    //button pressed css styling
    buttonPressed(e.target.id);
  });

  //Drumpad key press eventlistener (key press eventlistener for if button is in focus)
  drumpad.addEventListener("keydown", function (e) {
    updateDisplay(e);
    playSound(e);
  });
}

//Drumpad key press eventlistener (window)(key press eventlistener to dispatch/trigger button eventlistener)
window.addEventListener("keydown", function (e) {
  if (e.repeat) {
    return;
  }

  let keyPress = e.key.toUpperCase();
  if (drum_audioDisplayKey[keyPress]) {
    let newEvent = new CustomEvent("keydown");

    document.getElementById(keyPress + "-button").dispatchEvent(newEvent);

    //button pressed css styling
    buttonPressed(keyPress + "-button");
  }
});

window.addEventListener("keyup", function (e) {
  if (e.repeat) {
    return;
  }

  let keyPress = e.key.toUpperCase();
  if (drum_audioDisplayKey[keyPress]) {
    //button released css styling
    buttonReleased(keyPress + "-button");
  }
});

window.addEventListener("mouseup", function () {
  //button released css styling
  for (let elementID in drum_audioDisplayKey) {
    buttonReleased(elementID + "-button");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateAudio() {
  if (power === "on" && bank === "on") {
    for (let elementID in bank_audioDisplayKey) {
      document.getElementById(elementID).src =
        bank_audioDisplayKey[elementID]["src"];
    }
  } else if (power === "on" && bank === "off") {
    for (let elementID in drum_audioDisplayKey) {
      document.getElementById(elementID).src =
        drum_audioDisplayKey[elementID]["src"];
    }
  } else if (power === "off") {
    for (let elementID in drum_audioDisplayKey) {
      document.getElementById(elementID).src = "";
    }
  }
}

function updateDisplay(e) {
  if (power === "off") {
    display = "";
    document.getElementById("display-audio").innerHTML = display;
  } else if (
    e.target.id === "power-checkbox" ||
    e.target.id === "bank-checkbox"
  ) {
    display = "";
    document.getElementById("display-audio").innerHTML = display;
  } else {
    if (power === "on" && bank === "on") {
      //display = "";
      document.getElementById("display-audio").innerHTML = display;
      display = bank_audioDisplayKey[e.target.value]["display"];
      document.getElementById("display-audio").innerHTML = display;
    } else if (power === "on" && bank === "off") {
      //display = "";
      document.getElementById("display-audio").innerHTML = "";
      display = drum_audioDisplayKey[e.target.value]["display"];
      document.getElementById("display-audio").innerHTML = display;
    }
  }
}

function playSound(e) {
  if (power === "on") {
    //audio element
    let audio = document.getElementById(e.target.value);

    //set volume
    audio.volume = volume / 100;

    //play audio
    audioClipPlay();
    async function audioClipPlay() {
      try {
        await audio.play();
      } catch {
        console.log("Sound clip from server wasn't reached.");
      }
    }
  }
}

function buttonPressed(keyPressButtonElement) {
  //Button pressed css styling
  if (power === "on") {
    document.getElementById(keyPressButtonElement).style.backgroundColor =
      "white";
    document.getElementById(keyPressButtonElement).style.boxShadow =
      "grey 1px 1px";
  } else {
    document.getElementById(keyPressButtonElement).style.boxShadow =
      "grey 1px 1px";
  }
}

function buttonReleased(keyPressButtonElement) {
  //Button released css styling
  if (power === "on") {
    document.getElementById(keyPressButtonElement).style.backgroundColor =
      "grey";
    document.getElementById(keyPressButtonElement).style.boxShadow =
      "black 3px 3px 5px";
  } else {
    document.getElementById(keyPressButtonElement).style.boxShadow =
      "black 3px 3px 5px";
  }
}
