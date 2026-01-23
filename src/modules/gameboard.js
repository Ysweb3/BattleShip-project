import { Ship } from './ship.js';
export class Gameboard {//Gameboard class:Grid of 10x10 cells,total two gameboards(player and AI)
    board = [];
    totalAttempts = 0;
    totalHits = 0;
    totalShips= 0;
    constructor() {
        this.board = this.createGameBoard();
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
        if(!this.board[x][y].hasShip) {
            this.board[x][y].hasShip = true;
 
            this.totalShips++;
            return true;
        }
  
        return false;
    }
    addShipType(x,y,ship){
         if(this.board[x][y].hasShip) {
            this.board[x][y].ship = ship;
        }
    }
    checkShipType(x,y){
        return this.board[x][y].ship;
    }
    receiveAttack(x,y) {
        if(this.board[x][y].hasShip) {
            this.board[x][y].isHit = true;
            this.totalHits++;
            this.totalAttempts++;
            return true;
        }
        this.totalAttempts++;
        return false;
    }
    
    totalAttempts(){
        return this.totalAttempts;
    }
    totalHits(){
        return this.totalHits;
    }
    totalMisses(){
        return this.totalAttempts - this.totalHits;
    }
    allShipsSunk() {//To be checked every turn to determine if the game is over
        return this.totalShips === this.totalHits;
    }
}
