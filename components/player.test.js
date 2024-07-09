const Player = require('./player');
const Gameboard = require('./gameboard');
const Ship = require('./ship');

const player1 = new Player(false);
const computerPlayer = new Player(true);

test('player initilisation', () => {
    
    expect(player1.isComputer).toBe(false);

    expect(computerPlayer.isComputer).toBe(true);

});

test('player1 move', () => {

    const cruiser = new Ship(3, 0, false);

    computerPlayer.gameboard.placeShip(cruiser, [[0, 0], [0, 1], [0, 2]])

    player1.makeMove([0,1], computerPlayer.gameboard);

    expect(cruiser.hits).toEqual(1);

})

