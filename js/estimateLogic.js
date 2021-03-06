class EstimateGame {
  constructor(aID, bID, opID, resultID, level, difficulty) {
    this.a = "X";
    this.operator = "";
    this.b = "X";
    this.result = "X";
    this.aID = aID;
    this.bID = bID;
    this.opID = opID;
    this.resultID = resultID;
    this.level = level - 1;
    this.difficulty = difficulty;
    this.distance = 0;
    this.range = 0;

    this.setRange();
    this.setDistance();
    this.generateLevel();
    this.setLevel();
  }

  generateLevel() {
    let temp = 0;
    if (this.level === 0 || this.level === 1) {
      temp = this.getRandomInt(2);
      if (temp === 0) {
        this.operator = "+";
        this.setUpAdditionGame();
      } else {
        this.operator = "-";
        this.setUpSubtractionGame()
      }
    } else if (this.level === 2 || this.level === 3) {
      temp = this.getRandomInt(3);
      if (temp === 0) {
        this.operator = "+";
        this.setUpAdditionGame();
      } else if (temp === 1) {
        this.operator = "-";
        this.setUpSubtractionGame()
      } else if (temp === 2) {
        this.operator = "*";
        this.setUpMultiplyGame();
      } else {
        this.operator = "/";
        this.setUpDivideGame();
      }
    }

  }


  setUpSubtractionGame() {
    this.a = this.getRandomInt((this.range));
    this.b = this.getRandomInt(this.range);
    while ((this.a - this.b) < 0 || this.a === 0 || this.b === 0) {
      this.a = this.getRandomInt((this.range));
      this.b = this.getRandomInt((this.range));

    }
  }

  /**
   * Set generate  addition game with a specific range
   */
  setUpAdditionGame() {
    this.a = this.getRandomInt(this.range);
    this.b = this.getRandomInt(this.range);

    while ((this.a + this.b) >= this.range || this.a === 0 || this.b === 0) {
      this.a = this.getRandomInt(this.range);
      this.b = this.getRandomInt(this.range);

    }
  }

  /**
   * Sets the range of the numbers
   */
  setRange() {
    if (this.level === 0) {
      this.range = 20;
    } else if (this.level === 1) {
      this.range = 50;
    } else if (this.level === 2) {
      this.range = 200;
    } else {
      this.range = 1000;
    }
  }

  /**
   * Sets the max difference between two numbers
   */
  setDistance() {
    if (this.difficulty === 0) {
      this.distance = this.range * 0.25;
    } else if (this.difficulty === 1) {
      this.distance = this.range * 0.50
    } else if (this.difficulty === 2) {
      this.distance = this.range * 0.75
    } else {
      this.distance = this.range;
    }

  }

  /**
   * Generate the finished Task
   */
  setLevel() {
    //Set the level
    this.setValue(this.a, this.aID);
    this.setValue(this.b, this.bID);
    this.setValue(this.result, this.resultID);

    document.getElementById(this.opID).value = this.operator;
    document.getElementById(this.opID).readOnly = true;
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

  /**
   * Set generate  multiply game with a specific range
   */
  setUpMultiplyGame() {
    this.a = this.getRandomInt(this.range);
    this.b = this.getRandomInt(this.range);
    while ((this.a * this.b) >= this.range || this.a === 0 || this.b === 0) {
      this.a = this.getRandomInt(this.range);
      this.b = this.getRandomInt(this.range);
    }
  }

  /**
   * Set generate  multiply game with a specific range
   */
  setUpDivideGame() {
    this.a = this.getRandomInt(this.range);
    this.b = this.getRandomInt(this.range);
    while (this.a % this.b !== 0 || this.a === 0 || this.b === 0) {
      this.a = this.getRandomInt(this.range);
      this.b = this.getRandomInt(this.range);
    }
  }
}