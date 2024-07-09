const Gameboard = require('./gameboard');
const Ship = require('./ship');

test('gameboard initialised correctly', () => {

    const gameboard = new Gameboard;

    expect(gameboard.board).toEqual([]);

    expect(gameboard.ships).toEqual([]);

    expect(gameboard.missedAttacks).toEqual([]);

}); 

test('Gameboard should place ships at specific coordinates', () => {

    const gameboard = new Gameboard();

    const ship = new Ship(3, 0, false);

    gameboard.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
    
    expect(gameboard.ships.length).toBe(1);

    expect(gameboard.board.length).toBe(3);

  });

test('receive attack, hitting', () => {

    const gameboard = new Gameboard();

    const cruiser = new Ship(3, 0, false);

    gameboard.placeShip(cruiser, [[0, 0], [0, 1], [0, 2]])

    //missing
    gameboard.receiveAttack([0, 0]);

    expect(cruiser.hits).toEqual(1);

});

test('receive attack, missing', () => {

    const gameboard = new Gameboard();

    const cruiser = new Ship(3, 0, false);

    gameboard.placeShip(cruiser, [[0, 0], [0, 1], [0, 2]])

    //missing
    gameboard.receiveAttack([2, 2]);

    expect(cruiser.hits).toEqual(0);

});

test('all ships sunk', () => {

    const gameboard = new Gameboard();

    const cruiser = new Ship(3, 0, false);

    gameboard.placeShip(cruiser, [[0, 0], [0, 1], [0, 2]])

    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([0, 2]);

    cruiser.isSunk();

    expect(cruiser.sunk).toEqual(true);

});

test('all ships not sunk', () => {

    const gameboard = new Gameboard();

    const cruiser = new Ship(3, 0, false);

    gameboard.placeShip(cruiser, [[0, 0], [0, 1], [0, 2]])

    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);

    cruiser.isSunk();

    expect(cruiser.sunk).toEqual(false);

});