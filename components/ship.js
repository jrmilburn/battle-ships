class Ship {
    constructor(length, hits, sunk) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit() {

        this.hits++;

    }

    isSunk() {

        if(this.hits >= this.length) {
            this.sunk = true;
        } else {
            this.sunk = false;
        }

        return this.sunk;

    }

}

export default Ship;