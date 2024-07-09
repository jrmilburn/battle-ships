class Gameboard {
    
    constructor() {

        this.board = [];
        this.ships = [];
        this.missedAttacks = [];

    }


    //Function for placing coordinates where coordinates is an array of 
    //x, y coordinate pairs.
    //e.g. Coordinates = [[1,2], [1,3]];

    placeShip(ship, coordinates) {

        this.ships.push({ ship, coordinates });

        coordinates.forEach(coord => this.board.push({coord, ship}));

    }

    //Function for receiving attack where coord is an x,y coordinate pair
    //e.g. coord = [1,2];   

    receiveAttack(coord) {

        //First identify if the received attack has a ship on it
        const target = this.board.find(cell => cell.coord[0] === coord[0] && cell.coord[1] === coord[1]);

        //Check if ship exists on the target cell
        //If target does not exist, push the coord to missed Attacks

        if(target) {

            target.ship.hit();

            return true

        } else {

            this.missedAttacks.push(coord);

            return false

        }

    }

    allShipsSunk() {

        return this.ships.every(({ship}) => ship.isSunk());

    }

}

export default Gameboard;