let [games, skips, tries, correct, taskTries, difficulty] = [0, 0, 0, 0, 0, 0];
const level = localStorage.getItem("vOneLocalStorage");

//Timer in seconds
const timer = 30;

function startGame(x) {
  difficulty = x;

  document.getElementById("selectLevel").style.display = "none";
  document.getElementById("nextTaskBtn").style.visibility = "hidden";
  document.getElementById("gameResults").style.display = "none";
  document.getElementById("gameDisplay").style.display = "block";

  new EstimateGame("value1", "value2", "operator", "result", level, difficulty);

  if (parseInt(difficulty) >= 2) {
    resetTimer();
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

  //Skip Button
  taskTries = 0;
  document.getElementById("nextTaskBtn").style.visibility = "hidden";

  //Update Text
  updateText("Mhhh, schwierige Aufgabe...");

  //Generate new game
  new EstimateGame("value1", "value2", "operator", "result", level, difficulty);
  if (parseInt(difficulty) >= 2) {
    resetTimer();
    countdown();
  }
}

/**
 * Check if the task is solved successfully
 */
function submitEstimateGame() {
  timeLeft = 1;

  if (checkLevel("value1", "operator", "value2", "result")) {
    if (taskTries === 0) {
      updateCorrectPlayer();
    }
    updateText("WoW, super gemacht!")
    setTimeout("newTask()", 1000 * 3);

  } else {
    taskTries++;
    updateText("Schade, versuch es doch noch einmal!");

    if (taskTries === 1) {
      updateTriesPlayer()
    }

    if (taskTries === 2) {
      document.getElementById("nextTaskBtn").style.visibility = "visible";
    }

  }
}

/**
 * Finishes the Game
 * @constructor
 */
function Done() {
  if (games === 0 && tries <= 1) {
    updateGamesPlayer()
  }

  document.getElementById("gameDisplay").style.display = "none";
  document.getElementById("gameResults").style.display = "inherit";

  document.getElementById("tasks").innerText = games.toString();
  document.getElementById("skips").innerText = skips.toString();
  document.getElementById("tries").innerText = tries.toString();
  document.getElementById("name").innerText = localStorage.getItem("name");
  document.getElementById("correct").innerText = correct.toString();
}

/**
 * Updates some text
 * @param text
 */
function updateText(text) {
  document.getElementById("text").innerText = text;
}

/**
 * Skips to  the next task
 */
function nextTask() {
  console.log(taskTries)
  if (taskTries >= 1) {
    updateSkipsPlayer();
    tries--;
  }
  newTask();
}

/**
 * Checks if the task is successfully solved
 * @param value1
 * @param operator
 * @param value2
 * @param result
 * @returns {boolean}
 */
function checkLevel(value1, operator, value2, result) {
  timeLeft = -1;

  let a = document.getElementById(value1).value;
  let op = document.getElementById(operator).value;
  let b = document.getElementById(value2).value;
  let res = document.getElementById(result).value;

  let logs = 0;

  a = getRoundNumber(a);
  b = getRoundNumber(b);

  if (op === "+") {
    logs = a + b;
  } else if (op === "-") {
    logs = a - b;
  } else if (op === "*") {
    logs = a * b;
  } else if (op === "/") {
    logs = a / b;
  }

  console.log(a + "|" + b)
  console.log(res.toString() + logs.toString())
  return res.toString() === logs.toString();
}

/**
 * Number is rounded to the second decimal
 * @param number
 * @returns {number}
 */
function getRoundNumber(number) {
  let exponent = number.toString().length - 1;
  let factor = Math.pow(10, exponent);
  return Math.round(number / factor) * factor;
}

/**
 * Updates the played games
 */
function updateGamesPlayer() {
  games++;
  console.log("Games:" + games)
}

/**
 * Updates the the total skips of the player
 */
function updateSkipsPlayer() {
  skips++;
  console.log("Skips" + skips)
}

/**
 * Updates the total tries count of the player
 */
function updateTriesPlayer() {
  tries++;
  console.log("Versuche:" + tries)
}

/**
 * Restes the timer back to the initial value
 */
function resetTimer() {
  timeLeft = timer;
}

/**
 * Updates the total correct solved task of the player
 */
function updateCorrectPlayer() {
  correct++;
  console.log("Correct:" + correct)
}

/**
 * Stats and manages a countdown
 */
function countdown() {
  timeLeft--;
  if (timeLeft >= 1) {
    document.getElementById("time").innerHTML = String(timeLeft);
  } else {
    document.getElementById("time").innerHTML = "Unbegrenzt";
  }

  if (timeLeft > 0) {
    setTimeout(countdown, 1000);
  }
  if (timeLeft === 0) {
    submitEstimateGame();
  }

}

/**
 * Creates some cool emojis that fly around
 */
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

