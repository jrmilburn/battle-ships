// Import the necessary classes (assuming you have them in separate files)
import Player from './components/player.js';
import Ship from './components/ship.js';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector('body');

  const enemyHeading = document.createElement('h2');
  enemyHeading.textContent = 'ENEMY';
  enemyHeading.classList.add('eheading');

  const playerBoardElement = document.createElement("div");
  playerBoardElement.classList.add("board", "player-board");

  const enemyBoardElement = document.createElement("div");
  enemyBoardElement.classList.add("board", "enemy-board");

  const newGameButton = document.createElement("button");
  newGameButton.textContent = "New Game";
  newGameButton.classList.add('new-game-btn');

  const textBox = document.createElement('div');

  let playerName;

  let player1, player2, currentPlayer;

  body.style.scale = 0.8;

  function initializeGame(name, difficulty) {

    name = name === '' || undefined ? 'Player 1' : name;

    textBox.classList.add('text-box');
    textBox.textContent = `${name}'s turn, click the enemies board where you would like to strike`;

    const playerHeading = document.createElement('h2');
    playerHeading.textContent = `${name}`;
    playerHeading.classList.add('pheading');

    body.style.scale = 1;

    player1 = new Player(name);
    player2 = new Player('computer', true); // Computer player
    currentPlayer = player1;

    // Place ships for player1 (could be dynamic or random)
    player1.gameboard.placeShips();

    // Place ships for player2 (computer)
    player2.gameboard.placeShips();

    body.appendChild(newGameButton);
    body.appendChild(playerBoardElement);
    body.appendChild(enemyBoardElement);
    body.appendChild(playerHeading);
    body.appendChild(enemyHeading);
    body.appendChild(textBox);

    renderBoard(player1.gameboard, playerBoardElement);
    renderBoard(player2.gameboard, enemyBoardElement, true);
  }

  

  async function renderBoard(gameboard, boardElement, isEnemy = false) {
    boardElement.innerHTML = ''; // Clear existing grid cells
    const size = 10;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add('grid-cell');
        gridCell.dataset.coord = `${i},${j}`;

        if (!isEnemy) {
          const cell = gameboard.board.find(cell => cell.coord[0] === i && cell.coord[1] === j);
          if (cell) {
            gridCell.style.backgroundColor = 'lightgray'; // Indicate ship presence for player1
          }
        }

        await delay(3);

        boardElement.appendChild(gridCell);
      }
    }
  }

  function handleAttack(event) {
    const coord = event.target.dataset.coord.split(',').map(Number);
    const result = currentPlayer.makeMove(coord, currentPlayer === player1 ? player2.gameboard : player1.gameboard);

    if (result) {
      event.target.style.backgroundColor = 'green'; // Hit
    } else {
      event.target.style.backgroundColor = 'blue'; // Miss
    }

    if (player1.gameboard.allShipsSunk() || player2.gameboard.allShipsSunk()) {
      textBox.textContent = `${currentPlayer === player1 ? `${player1.name}` : 'Computer'} wins!`;
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;

    if (currentPlayer.isComputer) {
      const coord = currentPlayer.computerMove(player1.gameboard);
      handleComputerMove(coord);
    }
  }

  async function handleComputerMove(coord) {
    const cell = playerBoardElement.querySelector(`[data-coord="${coord.join(',')}"]`);
    textBox.textContent = 'Computer is striking...';
    await delay(1500);
    const result = currentPlayer.makeMove(coord, player1.gameboard);

    if (result) {
      cell.style.backgroundColor = 'red'; // Hit
      textBox.textContent = 'BOOOOM!';
      textBox.textContent += ` ${coord}...noted`;
    } else {
      cell.style.backgroundColor = 'orange'; // Miss
      textBox.textContent = 'Lucky this time...';
    }

    
    await delay(1000);

    if (currentPlayer.gameboard.allShipsSunk()) {
      textBox.textContent = 'Computer wins!';
    } else {
      currentPlayer = player1; // Switch back to player1
    }
  }

  newGameButton.addEventListener("click", () => {
    initializeGame(playerName);
  });
  enemyBoardElement.addEventListener("click", handleAttack);


  const dialogBtn = document.querySelector('.dialogBtn')
  const dialog = document.getElementById('startGame');
  dialog.showModal();

  dialogBtn.addEventListener('click', () => {
    
    playerName = document.getElementById('player1').value;

    initializeGame(playerName); // Initial setup
  })

});
