//User
let name = "unknown";
let grade = 0;

function setup() {
  document.getElementById("error").style.display = "none";
}

function chooseGrade(x) {
  document.getElementById("grade1").style.backgroundColor = "rgba(255, 255, 255, 0.47)";
  document.getElementById("grade2").style.backgroundColor = "rgba(255, 255, 255, 0.47)";
  document.getElementById("grade3").style.backgroundColor = "rgba(255, 255, 255, 0.47)";
  document.getElementById("grade4").style.backgroundColor = "rgba(255, 255, 255, 0.47)";

  document.getElementById("grade" + x).style.backgroundColor = "rgb(248, 169, 42)";
  grade = x;
  localStorage.setItem("vOneLocalStorage", x);
}

function createUser() {
  name = document.getElementById("username").value;
  if (name === "") {
    document.getElementById("error").style.display = "grid";
    document.getElementById("error").innerText = "Error: Bitte suche dir einen Namen aus!";
  }


  if (grade === 0) {
    document.getElementById("error").style.display = "grid";
    document.getElementById("error").innerText = "Error: Bitte wähle deine Klasse aus!";
  }

  changeWindow(1);

}

function changeWindow(x) {
  if (x === 0) {
    document.getElementById("form").style.display = "block";
    document.getElementById("games").style.display = "none";
  } else{
    document.getElementById("form").style.display = "none";
    document.getElementById("games").style.display = "inline";
  }
}

function playCal() {
  location.replace("sites/insertNumberGame.html");
}

function playUnits() {
  location.replace('/neue-seite.htm');
}



