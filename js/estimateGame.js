//Stats
let games = 0;
let skips = 0;
let tries = 0;

//Temp
let taskTries = 0;

let difficulty = 0;
let level = localStorage.getItem("vOneLocalStorage");

/**
 * Stats the game and generates the first task
 */
function startGame(x) {
  difficulty = x;

  //Change visibility attributes
  document.getElementById("selectLevel").style.display = "none";
  document.getElementById("nextTaskBtn").style.visibility = "hidden";
  document.getElementById("gameResults").style.display = "none";
  document.getElementById("gameDisplay").style.display = "block";


  new EstimateGame("value1", "value2", "operator", "result", level, difficulty);

  if (parseInt(difficulty) >= 2) {
    timeLeft = 10;
    countdown();
    if (parseInt(difficulty) === 3) {
      setInterval(createDistraction, 300);
    }
  }

  document.getElementById("text").innerText = "Mhhh, schwierige Aufgabe...";
}


function newTask() {
  //Update Stats
  updateGamesPlayer();
  updateTriesPlayer();

  //Skip Button
  taskTries = 0;
  document.getElementById("nextTaskBtn").style.visibility = "hidden";

  //Update Text
  updateText("Mhhh, schwierige Aufgabe...");

  //Generate new game
  new EstimateGame("value1", "value2", "operator", "result", level, difficulty);
  console.log("Schwierigkeit:" + difficulty)
  if (parseInt(difficulty) >= 2) {
    timeLeft = 10;
    countdown();
  }

}


function submitEstimateGame() {

  timeLeft = 1;
  document.getElementById("time").innerText = "Unbegrenzt!";


  if (checkLevel("value1", "operator", "value2", "result")) {
    updateText("WoW, super gemacht!")
    setTimeout("newTask()", 1000);
  } else {

    //Update text
    updateText("Schade, versuch es doch noch einmal!");

    //Update Stats
    updateTriesPlayer();
    taskTries++;

    if (taskTries === 2) {
      document.getElementById("nextTaskBtn").style.visibility = "visible";
    }

  }
}


/**
 * Ends game and skip to the result page
 * @constructor
 */
function Done() {
  //change menu
  document.getElementById("gameDisplay").style.display = "none";
  document.getElementById("gameResults").style.display = "inherit";

  //Set stats
  document.getElementById("tasks").innerText = "Aufgaben gelöst: " + games;
  document.getElementById("skips").innerText = "Aufgaben verworfen: " + skips;
  document.getElementById("tries").innerText = "Fehler: " + tries;
}

/**
 * Updates the text
 * @param text
 */
function updateText(text) {
  document.getElementById("text").innerText = text;
}

/**
 * Stats a new Task
 */
function nextTask() {
  newTask();
  skips++;
}

/**
 * Checks if the Task is solved successfully
 * @returns {boolean}
 */
function checkLevel(value1, operator, value2, result) {
  let a = document.getElementById(value1).value;
  let op = document.getElementById(operator).value;
  let b = document.getElementById(value2).value;
  let res = document.getElementById(result).value;

  console.log("Aufgabe:" + a + op + b + "=" + res);

  return (res >= roundNumber(a, b, op) * 0.75 && res <= roundNumber(a, b, op) * 1.25)
}

function getlength(number) {
  return number.toString().length;
}

function roundNumber(x1, x2, op) {
  let exponent = 0;
  if (x1 > x2) {
    exponent = getlength(x2) - 1;

  } else {
    exponent = getlength(x1) - 1
  }

  let faktor = Math.pow(10, exponent);

  console.log(exponent)

  x1 = Math.round(x1 / faktor) * faktor;
  x2 = Math.round(x2 / faktor) * faktor;
  console.log(x1 + "|" + x2)

  if (op === "+") {
    return x1 + x2;
  } else if (op === "-") {
    return x1 - x2;
  } else if (op === "*") {
    if (x1 === 0) {
      x1 = 1;
    } else if (x2 === 0) {
      x2 = 1;
    }
    return x1 * x2;
  } else if (op === "/") {
    return x1 / x2;
  }
}


/**
 * Updates player played games count
 */
function updateGamesPlayer() {
  games++;
}

/**
 * Updates player tries count
 */
function updateTriesPlayer() {
  tries++;
}


let timeLeft = 10;

function countdown() {
  timeLeft--;
  document.getElementById("time").innerHTML = String(timeLeft);
  if (timeLeft > 0) {
    setTimeout(countdown, 1000);
  }
  if (timeLeft === 0) {
    submitEstimateGame();
  }

}


function createDistraction() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  heart.innerHTML = "\t&#128526;"
  heart.style.zIndex = "-1"
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000)
}

