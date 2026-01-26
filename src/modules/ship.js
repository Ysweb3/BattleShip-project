export class Ship {
    constructor(length,name) {
        if (typeof length !== 'number' || length <= 0) {
            throw new Error("Ship length must be a positive number");
        }
        this.length = length;
        this.hits = 0;
        this.name = name;
    }
    
    hit() {
        this.hits++;
    }
    
    isSunk() {
        return this.hits >= this.length;
    }
}

