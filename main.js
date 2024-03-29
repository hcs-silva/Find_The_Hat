// Importing the 'prompt-sync' module and configuring it with 'sigint: true'
const prompt = require('prompt-sync')({ sigint: true });

// Constants for characters used in the game
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// Definition of the 'Field' class
class Field {
  constructor(hatAndHoles, field, counter) {
    this._field = field;
    this._hatAndHoles = hatAndHoles;
    this._counter = counter;
  }

  // Method to play the game
  playGame() {
    
    let y = 0;
    let x = 0;
    this.print(this._field);

    const dificulty = prompt('Choose Dificulty: Easy(E)/Hard(H)\n');

    if(dificulty === 'e') {

    // Main game loop
    while (this._hatAndHoles[y][x] === pathCharacter || this._hatAndHoles[y][x] === fieldCharacter) {
      // Prompt user for direction input
      const direction = prompt('Which direction would you like to move? Please enter N for North, S for South, E for East, or W for West.\n');

      //Added cancelation key press
      if (direction === 'c') {
        console.log('Game cancelled by user');
        break;
      }
       
      // Handle different directions
      if (direction.toUpperCase() === 'N') {
        if (y === 0) {
          console.log('You cannot move any further North. Please choose another direction');
        } else {
          y -= 1;
        }
      } else if (direction.toUpperCase() === 'S') {
        if (y >= this._field.length - 1) {
          console.log('You cannot move any further South. Please choose another direction');
        } else {
          y += 1;
        }
      } else if (direction.toUpperCase() === 'W') {
        if (x === 0) {
          console.log('You cannot move any further West. Please choose another direction');
        } else {
          x -= 1;
        }
      } else if (direction.toUpperCase() === 'E') {
        if (x >= this._field[y].length - 1) {
          console.log('You cannot move any further East. Please choose another direction');
        } else {
          x += 1;
        }
      } else {
        console.log('Invalid entry. Please enter N, S, E, or W');
      }

      // Check for game-ending conditions
      if (this._hatAndHoles[y][x] === hat) {
        console.log('You found the hat! You win!');
      } else if (this._hatAndHoles[y][x] === hole) {
        console.log('You fell in a hole. Game Over');
      } else {
        // Update the field and print it
        this._field[y][x] = pathCharacter;
        this.print(this._field);
      }
    }
  } else if (dificulty === 'h'){
    // Add a counter variable outside the loop
let turnCounter = 0;

while (this._hatAndHoles[y][x] === pathCharacter || this._hatAndHoles[y][x] === fieldCharacter) {
 

  // Increment the turn counter
  turnCounter++;

  // Check if it's the third turn (every three turns)
  if (turnCounter % 3 === 0) {
    // Add three new random holes to the game board
    this.addRandomHoles(3);
  }


}

// Add a new method to the class to randomly add holes
Field.prototype.addRandomHoles = function(numHoles) {
  for (let i = 0; i < numHoles; i++) {
    let randomX = Math.floor(Math.random() * this._field[0].length);
    let randomY = Math.floor(Math.random() * this._field.length);

    // Check if the random position is not the current player's position or the hat's position
    while (
      (randomX === x && randomY === y) ||
      this._hatAndHoles[randomY][randomX] === hat ||
      this._hatAndHoles[randomY][randomX] === hole
    ) {
      randomX = Math.floor(Math.random() * this._field[0].length);
      randomY = Math.floor(Math.random() * this._field.length);
    }

    // Add a hole at the random position
    this._hatAndHoles[randomY][randomX] = hole;
  }
}

  }else {
    console.log('Invalid Dificulty');
    return;
  };

  // Method to add random holes
  addRandomHoles(numHoles) {
    for (let i = 0; i < numHoles; i++) {
      let randomX = Math.floor(Math.random() * this._field[0].length);
      let randomY = Math.floor(Math.random() * this._field.length);

      // Check if the random position is not the current player's position or the hat's position
      while (
        (randomX === x && randomY === y) ||
        this._hatAndHoles[randomY][randomX] === hat ||
        this._hatAndHoles[randomY][randomX] === hole
      ) {
        randomX = Math.floor(Math.random() * this._field[0].length);
        randomY = Math.floor(Math.random() * this._field.length);
      }

      // Add a hole at the random position
      this._hatAndHoles[randomY][randomX] = hole;
    }
  }
}

  // Method to print the field
  print() {
    for (let row of this._field) {
      console.log(row.join(' '));
    }
  }

  // Static method to generate a field with hat and holes
  static generateField(height, width, holes) {
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < width; j++) {
        newField[i].push(fieldCharacter);
      }
    }

    //Randomly place the Character
    newField[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)] = pathCharacter;

    // Place the hat randomly
    let hatX = Math.floor(Math.random() * width);
    let hatY = Math.floor(Math.random() * height);
    newField[hatY][hatX] = hat;

    // Place holes randomly
    for (let k = holes; k > 0; k--) {
      let holeX = hatX;
      let holeY = hatY;
      while (holeX === hatX) {
        holeX = Math.floor(Math.random() * width);
      }
      while (holeY === hatY) {
        holeY = Math.floor(Math.random() * height);
      }
      newField[holeY][holeX] = hole;
    }

    return newField;
  }

  // Static method to generate a blank field for the user to traverse without seeing the hat and holes
  static generateBlankField(height, width) {
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < width; j++) {
        newField[i].push(fieldCharacter);
      }
    }
    newField[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)] = pathCharacter;
    return newField;
  }
}

// Create the blank field for the user to see
const blankField = Field.generateBlankField(10, 10);

// Create the field with the hat and holes
const newField = Field.generateField(10, 10, 1);


// Instantiate a Field object using newField for hatAndHoles and blankField for the field
let myField = new Field(newField, blankField);

// Call the playGame method to start the game
myField.playGame();
