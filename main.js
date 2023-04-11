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
const percentHoles = 0.08; // 8% of the field is holes, per minimum requirement by Jean (8% * (10 * 10 game board))  


// A function to tell a simple story background to set the mood for game
function tellStory() {
  console.log("\x1b[36m%s\x1b[0m", "A prisoner in a dungeon maze, by the name of Yen, learns of a magical teleportation stone that can help him escape.");
  prompt('\x1b[90mPress Enter to continue.\x1b[0m');
  console.log("\x1b[36m%s\x1b[0m", "He decides to search for the stone to aid his escape.");
  prompt('\x1b[90mPress Enter to continue.\x1b[0m');
  console.log("\x1b[36m%s\x1b[0m", "The maze is filled with dangerous sink-holes that make the journey difficult.");
  prompt('\x1b[90mPress Enter to continue.\x1b[0m');
  console.log("\x1b[36m%s\x1b[0m", "Despite the challenges, the prisoner remains determined to find the stone and escape.");
  prompt('\x1b[90mPress Enter to continue.\x1b[0m');
  console.log("\x1b[36m%s\x1b[0m", "Here the adventure begins... Help the prisoner find the teleportation stone and escape the maze!!");
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
  switch (direction.toLowerCase()) {
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

    //prompt for user input
    const direction = prompt('Which direction? (Up / Down / Left / Right)').toLowerCase();
    const nextPosition = getNextPosition(direction, playerPosition);

    //checks if the avatar is out of bounds
    if (isOutOfBounds(nextPosition, height, width)) {
      console.log('Out of bounds! Game over. You\'ve got whacked by a baton weilding cop! Stay inside the sandbox! ');
      playing = false;
      break;
    }
    const nextTile = field[nextPosition[0]][nextPosition[1]];
    //checks if the avatar is on a hole
    if (nextTile === hole) {
      console.log('Oh no... you fell into a sink-hole. Game over.');
      playing = false;
      break;

      //checks if the avatar is on the teleportation stone
    } else if (nextTile === stone) {
      console.log('\x1b[36m%s', 'X marks the spot!\x1b[0m', 'Congratulations, you found the teleportation stone!', '\x1b[33mNow Grade me A please. :)\x1b[0m');
      playing = false;
      break;
    }

    //moves the avatar
    field[nextPosition[0]][nextPosition[1]] = pathCharacter;
    playerPosition = nextPosition;
  }
}

// marking x as red on the game board
function printField(field) {
  clear();
  field.forEach(row => {
    const coloredRow = row.map(char => char === stone ? `\x1b[31m${char}\x1b[0m` : char);
    console.log(coloredRow.join(''));
  });
}
