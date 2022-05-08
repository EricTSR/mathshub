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

    console.log(this.difference())
    let units = ['km', 'm', 'cm', 'mm'];
    let unites2 = ['t', 'kg', 'g', 'mg'];
    console.log(this.difference(10, 100))

    //Nummer get
    let unit1 = this.getRandomInt(units.length);
    let unit2 = this.getRandomInt(units.length);

    //3 2

    while (unit2 === unit1 || this.difference(unit1, unit2) > 1) {
      console.log("--------TRY--------")
      console.log("1st", unit2 === unit1)
      console.log("2cd", this.difference(unit1, unit2) <= 1, this.difference(unit1, unit2) )
      unit1 = this.getRandomInt(units.length);
      unit2 = this.getRandomInt(units.length);
    }

    //set number for conversion
    this.a = (this.getRandomInt(10) + 1).toString();

    let random = this.getRandomInt(2);
    if (random === 0) {
      this.aOp = units[unit1];
      this.bOp = units[unit2];
    } else {
      this.aOp = unites2[unit1];
      this.bOp = unites2[unit2];
    }

  }


  difference = function (a, b) { return Math.abs(a - b); }

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