//User
let name = "unknown";
let grade = null;
let check = false;


function setup() {
  document.getElementById("error").style.display = "none";
  document.getElementById("textH1").style.display = "none";
  changeWindow(0);

  if (grade < 4) {
    document.getElementById("game_units").style.display = "none";
  }
}

function logout() {
  localStorage.clear();
  setup();
}


function chooseGrade(x) {
  document.getElementById("grade1").style.backgroundColor = "rgba(255, 255, 255, 0.47)";
  document.getElementById("grade2").style.backgroundColor = "rgba(255, 255, 255, 0.47)";
  document.getElementById("grade3").style.backgroundColor = "rgba(255, 255, 255, 0.47)";
  document.getElementById("grade4").style.backgroundColor = "rgba(255, 255, 255, 0.47)";

  document.getElementById("grade" + x).style.backgroundColor = "rgb(255, 7, 110)";
  grade = x;
  check = true;

  localStorage.setItem("vOneLocalStorage", x);
}

function createUser() {
  name = document.getElementById("username").value;

  if (check) {
    if (name === "") {
      name = "CooleBanane"
    }

    if (grade === "") {
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
    location.reload();

  } else {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = "Vergiss die Wahl der Klassenstufe nicht!";
  }


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
    document.getElementById("navbar").style.display = "none";
    document.getElementById("games").style.display = "none";
    document.getElementById("textH1").style.display = "none";
    document.getElementById("error").style.display = "none";
  } else {
    document.getElementById("form").style.display = "none";
    document.getElementById("navbar").style.display = "flex";
    document.getElementById("games").style.display = "flex";
    document.getElementById("textH1").style.display = "block";
    document.getElementById("error").style.display = "block";
  }

}

function playCal() {
  location.replace("sites/insertNumberGame.html");
}

function playUnits() {
  location.replace("sites/convertNumberGame.html");
}

