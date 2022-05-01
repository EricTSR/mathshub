class ConvertGame {
  constructor(aID, aOpID, bID, bOpID) {
    this.a = "X";
    this.b = "X";
    this.aOp = "X";
    this.bOp = "X";

    this.aID = aID;
    this.bID = bID;
    this.aOpID = aOpID;
    this.bOpID = bOpID;

    this.generateLevel();
    this.setLevel();
  }

  generateLevel() {
    this.generateM();


  }

  generateM() {
    let units = ['km', 'm', 'cm', 'mm'];


    let unit1 = this.getRandomInt(units.length);
    let unit2 = this.getRandomInt(units.length);
    let number = this.getRandomInt(10);

    while (unit2 === unit1) {
      unit1 = this.getRandomInt(units.length);
      unit2 = this.getRandomInt(units.length);
    }

    //set number for conversion
    this.a = number;
    this.aOp = units[unit1];
    this.bOp = units[unit2];

    console.log(number + units[unit1] + "= ???" + units[unit2]);


  }


  /**
   * Generate the finished Task
   */
  setLevel() {
    //Set the level
    this.setValue(this.a, this.aID);
    this.setValue(this.b, this.bID);
    this.setValue(this.aOp, this.aOpID);
    this.setValue(this.bOp, this.bOpID);

    document.getElementById(this.bOpID).readOnly = true;
    document.getElementById(this.aOpID).readOnly = true;
    console.log("NG: Game has been set to the Elements!");
  }

//Put the input fields into read only mod, when they have no value
  setValue(value, id) {
    if (value === "X") {
      document.getElementById(id).value = "";
      document.getElementById(id).readOnly = false;
    } else {
      document.getElementById(id).value = value;
      document.getElementById(id).readOnly = true;
    }
  }

  /**
   * Generates a random int number of the range of 0 to max
   * @param max
   * @returns {number}
   */
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


}