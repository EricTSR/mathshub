//User
let name = "unknown";
let grade = 0;


function setup() {
  document.getElementById("error").style.display = "none";
  changeWindow(0);
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

  if (name === "") {
    name = "CooleBanane"
  }

  localStorage.setItem("name", name);
  localStorage.setItem("klasse", grade);

  if (grade === 0) {
    grade = 1;
  }

  document.getElementById("nav_user").innerHTML = name;
  document.getElementById("nav_klasse").innerHTML = grade;

  changeWindow(1);

}

function changeWindow(x) {
  name = localStorage.getItem("name");
  grade = localStorage.getItem("klasse");

  document.getElementById("nav_user").innerHTML = name;
  document.getElementById("nav_klasse").innerHTML = grade;

  console.log(name);
  console.log(x)

  if (x === 0 && name === null) {
    console.log("hello")
    document.getElementById("form").style.display = "block";
    document.getElementById("games").style.display = "none";
  } else {
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

