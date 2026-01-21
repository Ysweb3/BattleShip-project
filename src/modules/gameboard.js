import { Ship } from './ship.js';
export class Gameboard {
    constructor(size) {
        this.size = size;
    }
    createGameBoard() {
        const board = [];
    for (let i = 0; i < 10; i++) {
        const row = [];
        for (let j = 0; j < 10; j++) {
            row.push({
                hasShip: false,  // Boolean indicating if a ship is present
                isHit: false,    // Boolean indicating if this cell has been attacked
                ship: null       // Reference to the ship object (if any)
            });
        }
        board.push(row);
    }
    return board;
    }
    placeShip(x,y) {
         
    }
    receiveAttack(x,y) {
        
    }
    allShipsSunk() {
        
    }
}
