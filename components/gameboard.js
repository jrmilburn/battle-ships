import Ship from './ship.js';

class Gameboard {
    
    constructor() {

        this.board = [];
        this.ships = [];
        this.missedAttacks = [];

    }


    //Function for placing coordinates where coordinates is an array of 
    //x, y coordinate pairs.
    //e.g. Coordinates = [[1,2], [1,3]];

    placeShips() {

        //create array of options for ship placement

        const carrier = new Ship(5, 0, false);
        const battleship = new Ship(4, 0, false);
        const cruiser = new Ship(3, 0, false);
        const submarine = new Ship(3, 0, false);
        const destroyer = new Ship(2, 0, false);

        const shipPositioning = [ {type: carrier, 
        placements: [[[0, 0],[0, 1],[0, 2],[0, 3],[0, 4]], 
        [[6, 5],[6, 6],[6, 7],[6, 8],[6, 9]],
        [[2, 4],[3, 4],[4, 4],[5, 4],[6, 4]]]},

        {type: battleship,
        placements: [[[4, 3],[4, 4],[4, 5],[4, 5]], 
        [[7, 6],[7, 7],[7, 8],[7, 9]],
        [[1, 0],[2, 0],[3, 0],[4, 0]]]},

        {type: cruiser, 
        placements: [[[3, 3],[3, 2],[3, 1]], 
        [[9, 9],[9, 8],[9, 7]],
        [[3, 1],[3, 2],[3, 3]]]},

        {type: submarine, 
        placements: [[[7, 7],[7, 8],[7, 9]], 
        [[5, 5],[5, 4],[5, 3]],
        [[3, 8],[3, 9],[3, 10]]]},
        
        {type: destroyer, 
        placements: [[[1, 7],[1, 8]], 
        [[9, 1],[9, 0]],
        [[4, 5],[4, 6]]]}

        ]

        //generate random value from 0 to 2
        const index = Math.floor(Math.random() * 3);

        shipPositioning.forEach(shipPos => {
            const coordinates = shipPos.placements[index];
            const ship = shipPos.type;

            this.ships.push({ ship, coordinates });

            coordinates.forEach(coord => this.board.push({coord, ship}));
        })

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