//Stats
let games = 0;
let skips = 0;
let tries = 0;

//Temp
let taskTries = 0;


/**
 * Stats the game and generates the first task
 */
function startGame() {

  document.getElementById("nextTaskBtn").style.visibility = "hidden";
  document.getElementById("convertNumberGameResults").style.display = "none";
  document.getElementById("convert-NumberGame").style.display = "block";

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


  console.log("Hallo")
}


function submitNumberGame() {

  if (checkLevel("value1", "operator1", "value2", "operator2")) {
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
  document.getElementById("convert-NumberGame").style.display = "none";
  document.getElementById("convertNumberGameResults").style.display = "inherit";

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
  console.log("SKips" + skips)
}

/**
 * Checks if the Task is solved successfully
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

