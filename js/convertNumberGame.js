let [games, skips, tries, correct, taskTries, difficulty] = [0, 0, 0, 0, 0, 0];

/**
 * Stats the game and generates the first task
 */
function startGame() {

  document.getElementById("nextTaskBtn").style.visibility = "hidden";
  document.getElementById("gameResults").style.display = "none";
  document.getElementById("gameDisplay").style.display = "block";

  new ConvertGame("value1", "operator1", "value2", "operator2");


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
  new ConvertGame("value1", "operator1", "value2", "operator2");

}


function submitNumberGame() {
  if (checkLevel("value1", "operator1", "value2", "operator2")) {
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
 * Ends game and skip to the result page
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
 * Checks if the task is successfully solved
 * @param value1
 * @param operator1
 * @param value2
 * @param operator2
 * @returns {boolean}
 */
function checkLevel(value1, operator1, value2, operator2) {

  let v1 = parseInt(document.getElementById(value1).value);
  let op1 = document.getElementById(operator1).value;
  let v2 = parseFloat(document.getElementById(value2).value);
  let op2 = document.getElementById(operator2).value;

  if (op1 === "km") {
    return checkKM(v1, v2, op2);
  } else if (op1 === "m") {
    return checkM(v1, v2, op2);
  } else if (op1 === "cm") {
    return checkCM(v1, v2, op2)
  } else if (op1 === "mm") {
    return checkMM(v1, v2, op2)
  } else if (op1 === "t") {
    return checkT(v1, v2, op2)
  } else if (op1 === "kg") {
    return checkKg(v1, v2, op2)
  } else if (op1 === "mg") {
    return checkMG(v1, v2, op2)
  } else if (op1 === "g") {
    return checkG(v1, v2, op2)
  }


}

function checkT(x, v2, op2) {
  switch (op2) {
    case "kg":
      return x * 1000 === v2;
    case "g":
      return x * 1_000_000 === v2;
    case "mg":
      return x * 1_000_000_000 === v2;
    default:
      console.log("Smh! T")
  }
}

function checkKg(x, v2, op2) {
  switch (op2) {
    case "t":
      return x / 1000 === v2;
    case "g":
      return x * 1000 === v2;
    case "mg":
      return x * 1_000_000 === v2;
    default:
      console.log("Smh! T")
  }
}

function checkG(x, v2, op2) {
  switch (op2) {
    case "t":
      return x / 1000_000 === v2;
    case "kg":
      return x / 1000 === v2;
    case "mg":
      return x * 1000 === v2;
    default:
      console.log("Smh! T")
  }
}

function checkMG(x, v2, op2) {
  switch (op2) {
    case "t":
      return x / 1_000_000_000 === v2;
    case "kg":
      return x / 1_000_000 === v2;
    case "g":
      return x * 1000 === v2;
    default:
      console.log("Smh! T")
  }
}


function checkKM(x, v2, op2) {
  switch (op2) {
    case "m":
      return x * 1000 === v2;
    case "cm":
      return x * 100000 === v2;
    case "mm":
      return x * 1000000 === v2;
    default:
      console.log("Smh! KM")
  }
}

function checkM(x, v2, op2) {
  console.log("x:", x, "v2:", v2, "op2:", op2)
  switch (op2) {
    case "km":
      console.log(x / 1000);
      console.log(v2);
      return x / 1000 === v2;
    case "cm":
      console.log(x * 100);
      console.log(v2);
      return x * 100 === v2;
    case "mm":
      console.log(x * 1000);
      console.log(v2);
      return x * 1000 === v2;
    default:
      console.log("Smh! M")
  }
}

function checkCM(x, v2, op2) {
  switch (op2) {
    case "km":
      return x / 100000 === v2;
    case "m":
      return x / 100 === v2;
    case "mm":
      return x * 10 === v2;
    default:
      console.log("Smh! CM")
  }
}

function checkMM(x, v2, op2) {
  switch (op2) {
    case "km":
      return x / 1000000 === v2;
    case "m":
      return x / 100 === v2;
    case "cm":
      return x / 10 === v2;
    default:
      console.log("Smh! MM")
  }
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
 * Updates some text
 * @param text
 */
function updateText(text) {
  document.getElementById("text").innerText = text;
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
 * Updates the total correct solved task of the player
 */
function updateCorrectPlayer() {
  correct++;
  console.log("Correct:" + correct)
}
