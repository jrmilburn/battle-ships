const Ship = require('./ship'); 

const cruiser = new Ship(3, 0, false);

test('check initialistion of ship object', () => {
    expect(cruiser.length).toEqual(3);

    expect(cruiser.hits).toEqual(0);

    expect(cruiser.sunk).toBe(false);
}) 

test('increase ship hit count by 1', () => {

    cruiser.hit();

    expect(cruiser.hits).toBe(1);
})

test('cruiser not sunk', () => {

    expect(cruiser.isSunk()).toBe(false);

})

test('cruiser sunk', () => {

    cruiser.hit();
    cruiser.hit();

    expect(cruiser.isSunk()).toBe(true);
})