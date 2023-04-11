/**
 * This is version 2 of the game
 * changelog:
 * 1. a UX colour theme workaround hack to address: assessment point 4
 * 2. minor english grammar fixes
 * 3. increased sinkhole percentage to 10%
 * 4. tidy up coding
 */



// package dependencies
const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');


// pre-defined variables by test question
const stone = 'x';
const hole = 'o';
const fieldCharacter = '░';
const pathCharacter = '¥';
const height = 10;
const width = 10;

// random chance of a hole in the field
const percentHoles = 0.1; // 10% (10 holes) of the field is holes, per 8-12 minimum requirement by Jean (0.1 * (10 * 10 game board))  


// A function to tell a simple story background to set the mood for game
function tellStory() {
  console.log("\x1b[36m%s\x1b[0m", "A prisoner in a big underground dungeon, by the name of Yen, learns of a magical teleportation stone that can help him escape.");
  prompt('\x1b[90mPress Enter to continue.\x1b[0m');
  console.log("\x1b[36m%s\x1b[0m", "He decides to search for the stone to aid his escape.");
  prompt('\x1b[90mPress Enter to continue.\x1b[0m');
  console.log("\x1b[36m%s\x1b[0m", "The maze is filled with dangerous sink-holes that make the journey difficult.");
  prompt('\x1b[90mPress Enter to continue.\x1b[0m');
  console.log("\x1b[36m%s\x1b[0m", "Despite the challenges, the prisoner remains determined to find the stone and escape.");
  prompt('\x1b[90mPress Enter to continue.\x1b[0m');
  console.log("\x1b[36m%s\x1b[0m", "Here the adventure begins... Help the prisoner find the teleportation stone and escape the dungeon!!");
  prompt('\x1b[91mPress Enter to start the game.\x1b[0m');
}

tellStory();
playGame();


// A function to generate the field, with the given dimensions and percentage of holes
function generateField(height, width, percentHoles) {
  const field = new Array(height).fill(0).map(() => new Array(width));
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const prob = Math.random();
      field[y][x] = prob > percentHoles ? fieldCharacter : hole; // see percentHoles. 8% of the field is holes
    }
  }
  return field;
}

//generate the gameboard field
function printField(field) {
  clear(); //clears the screen, after story is told
  field.forEach(row => console.log(row.join('')));
}

//Avatar movement keys
function getNextPosition(direction, position) {
  direction = direction.toLowerCase();
  if (!['up', 'down', 'left', 'right', 'u', 'd', 'l', 'r'].includes(direction)) { //validation for user who enters other keys not intented for the game
    //console.log('Invalid direction! Please enter a valid direction.');
    return position;
  }
  switch (direction) {
    case 'u': //to allow single letter input
    case 'up': //this is full text input
      return [position[0] - 1, position[1]];
    case 'r': //to allow single letter input
    case 'right':
      return [position[0], position[1] + 1];
    case 'd': //to allow single letter input
    case 'down':
      return [position[0] + 1, position[1]];
    case 'l': //to allow single letter input
    case 'left':
      return [position[0], position[1] - 1];
    default:
      return position;
  }
}

//checks if the avatar is out of bounds
function isOutOfBounds(position, height, width) {
  return (
    position[0] < 0 ||
    position[0] >= height ||
    position[1] < 0 ||
    position[1] >= width
  );
}

function playGame() {

  const field = generateField(height, width, percentHoles); //generates the field 

  let playerPosition = [0, 0]; //starting position of the avatar
  let stonePosition = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];
  while (stonePosition[0] === 0 && stonePosition[1] === 0) {
    stonePosition = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];
  }
  field[playerPosition[0]][playerPosition[1]] = pathCharacter;
  field[stonePosition[0]][stonePosition[1]] = stone;

  // main game loop
  let playing = true;
  while (playing) {
    printField(field);

    //prompt for user input, with uni colour highlighting
    const direction = prompt('Move which direction? (\u001b[32mU\u001b[0m\x1b[90mp\x1b[0m / \u001b[32mD\u001b[0m\x1b[90mown\x1b[0m / \u001b[32mL\u001b[0m\x1b[90meft\x1b[0m / \u001b[32mR\u001b[0m\x1b[90might\x1b[0m) ').toLowerCase();
    /**
     * caveat: 
     * I was not able to product a bug free resolution within my codes in time 
     * per point 4: to prompt an invalid movement alert when user input a wrong movement key 
     * So I came up with a solution hack
     * working around an UI/UX fix that prempt a wrong key situation by colour highlighting the valid keys
     * invalid keys will be ignored by the game & will not affect the gameplay.
     */

    // check if the input is a valid direction
    if (!['up', 'down', 'left', 'right', 'u', 'd', 'l', 'r'].includes(direction)) {
    }

    const nextPosition = getNextPosition(direction, playerPosition);

    //checks if the avatar is out of bounds
    if (isOutOfBounds(nextPosition, height, width)) {
      console.log('Out of bounds!', '\x1b[31mYou got whacked by a baton weilding jailer!\x1b[0m', 'Stay inside the sandbox! Game over.');
      playing = false;
      break;
    }
    const nextTile = field[nextPosition[0]][nextPosition[1]];

    //checks if the avatar is on a hole
    if (nextTile === hole) {
      console.log('Oh no...', '\x1b[31m you fell into a sink-hole.\x1b[0m', 'Game over.');
      playing = false;
      break;

      //checks if the avatar is on the teleportation stone
    } else if (nextTile === stone) {
      console.log('\x1b[32m%s', 'X marks the spot!\x1b[0m', 'Congratulations, you found the teleportation stone!', '\x1b[36m:)\x1b[0m');
      playing = false;
      break;
    }

    //moves the avatar
    field[nextPosition[0]][nextPosition[1]] = pathCharacter;
    playerPosition = nextPosition;
  }
}

// marking x as green on the game board
function printField(field) {
  clear();
  field.forEach(row => {
    const coloredRow = row.map(char => char === stone ? `\x1b[32m${char}\x1b[0m` : char);
    console.log(coloredRow.join(''));
  });
}
