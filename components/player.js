// Player.js
import Gameboard from './gameboard.js';

class Player {
  constructor(isComputer = false) {
    this.gameboard = new Gameboard();
    this.isComputer = isComputer;
    this.previousHits = []; // Track previous hits for smart targeting
    this.allMoves = []; // Track all moves to avoid duplicate moves
  }

  makeMove(coord, opponentGameboard) {
    const hit = opponentGameboard.receiveAttack(coord);
    if (hit && this.isComputer) {
      this.previousHits.push(coord);
    }
    this.allMoves.push(coord); // Track this move
    return hit;
  }

  computerMove(opponentGameboard) {
    let coord;

    // Try smart targeting based on previous hits
    if (this.previousHits.length > 0) {
      const lastHit = this.previousHits[this.previousHits.length - 1];
      const potentialMoves = [
        [lastHit[0] + 1, lastHit[1]],
        [lastHit[0] - 1, lastHit[1]],
        [lastHit[0], lastHit[1] + 1],
        [lastHit[0], lastHit[1] - 1]
      ];

      for (let move of potentialMoves) {
        if (this.isValidMove(move, opponentGameboard)) {
          coord = move;
          break;
        }
      }
    }

    // If no smart move found, generate random move
    if (!coord) {
      do {
        coord = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      } while (!this.isValidMove(coord, opponentGameboard));
    }

    return coord;
  }

  isValidMove(coord, opponentGameboard) {
    const [x, y] = coord;
    if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;
    if (this.allMoves.some(move => move[0] === x && move[1] === y)) return false; // Check if move was already made
    return true;
  }
}

export default Player;
