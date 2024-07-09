// Import the necessary classes (assuming you have them in separate files)
import Player from './components/player.js';
import Ship from './components/ship.js';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const body = document.querySelector('body');

  const playerBoardElement = document.createElement("div");
  playerBoardElement.classList.add("board", "player-board");

  const enemyBoardElement = document.createElement("div");
  enemyBoardElement.classList.add("board", "enemy-board");

  const newGameButton = document.createElement("button");
  newGameButton.textContent = "New Game";
  newGameButton.classList.add('new-game-btn');

  body.appendChild(newGameButton);
  container.appendChild(playerBoardElement);
  container.appendChild(enemyBoardElement);

  let player1, player2, currentPlayer;

  function initializeGame() {
    player1 = new Player();
    player2 = new Player(true); // Computer player
    currentPlayer = player1;

    // Place ships for player1 (could be dynamic or random)
    player1.gameboard.placeShip(new Ship(5), [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
    player1.gameboard.placeShip(new Ship(4), [[0, 6], [0, 7], [0, 8], [0, 9]]);
    player1.gameboard.placeShip(new Ship(3), [[2, 0], [3, 0], [4, 0]]);
    player1.gameboard.placeShip(new Ship(3), [[7, 0], [8, 0], [9, 0]]);
    player1.gameboard.placeShip(new Ship(2), [[6, 8], [7, 8]]);

    // Place ships for player2 (computer)
    player2.gameboard.placeShip(new Ship(5), [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
    player2.gameboard.placeShip(new Ship(4), [[0, 6], [0, 7], [0, 8], [0, 9]]);
    player2.gameboard.placeShip(new Ship(3), [[2, 0], [3, 0], [4, 0]]);
    player2.gameboard.placeShip(new Ship(3), [[7, 0], [8, 0], [9, 0]]);
    player2.gameboard.placeShip(new Ship(2), [[6, 8], [7, 8]]);

    renderBoard(player1.gameboard, playerBoardElement);
    renderBoard(player2.gameboard, enemyBoardElement, true);
  }

  function renderBoard(gameboard, boardElement, isEnemy = false) {
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

        boardElement.appendChild(gridCell);
      }
    }
  }

  function handleAttack(event) {
    const coord = event.target.dataset.coord.split(',').map(Number);
    const result = currentPlayer.makeMove(coord, currentPlayer === player1 ? player2.gameboard : player1.gameboard);

    if (result) {
      event.target.style.backgroundColor = 'red'; // Hit
    } else {
      event.target.style.backgroundColor = 'blue'; // Miss
    }

    if (player1.gameboard.allShipsSunk() || player2.gameboard.allShipsSunk()) {
      alert(`${currentPlayer === player1 ? 'Player 2' : 'Player 1'} wins!`);
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;

    if (currentPlayer.isComputer) {
      const coord = currentPlayer.computerMove(player1.gameboard);
      handleComputerMove(coord);
    }
  }

  function handleComputerMove(coord) {
    const cell = playerBoardElement.querySelector(`[data-coord="${coord.join(',')}"]`);
    const result = currentPlayer.makeMove(coord, player1.gameboard);

    if (result) {
      cell.style.backgroundColor = 'red'; // Hit
    } else {
      cell.style.backgroundColor = 'blue'; // Miss
    }

    if (player1.gameboard.allShipsSunk()) {
      alert('Computer wins!');
    } else {
      currentPlayer = player1; // Switch back to player1
    }
  }

  newGameButton.addEventListener("click", initializeGame);
  enemyBoardElement.addEventListener("click", handleAttack);

  initializeGame(); // Initial setup
});
