require("./styles.css"); // Commented out for now - CSS will be handled by webpack
import { Gameboard } from './modules/gameboard';
import { Ship } from './modules/ship';
import { RealPlayer } from './modules/player';
import { AIPlayer } from './modules/player';

const playerBoard = new Gameboard();
const opponentBoard = new Gameboard();
const player = new RealPlayer();
const opponent = new AIPlayer();

const playerboard = document.getElementById('playerBoard');
const opponentboard = document.getElementById('opponentBoard');



function createGrid(boardElement, size = 10,board,boardType) {
    // Clear any existing grid
    boardElement.innerHTML = '';
    
 
    boardElement.style.display = 'grid';
    boardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    boardElement.style.gridGap = '1px';
    boardElement.style.border = '1px solid #333';
    boardElement.style.width = 'fit-content';
    
    // Create cells
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            
           
            cell.style.aspectRatio = '1';
            cell.style.height = '20px'
            cell.style.width = '20px'
            cell.style.border = '1px solid #666';
            cell.style.backgroundColor = '#f0f0f0';
            cell.style.cursor = 'pointer';
            cell.style.transition = 'background-color 0.6s';// Smooth transition for hover effect change this to make it faster or slower
            

            // cell.addEventListener('mouseOver', () => {
            //     if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
            //         cell.style.backgroundColor = '#8b8b8bff';
            //     }
            // });
            
            // cell.addEventListener('mouseLeave', () => {
            //     if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
            //         cell.style.backgroundColor = '#f0f0f0';
            //     }
            // });
            
           
            cell.addEventListener('click', () => handleCellClick(row, col, cell,boardType));
            
            boardElement.appendChild(cell);

            board.addElementToCell(row, col, cell);//!Important this connects the display board to the game board

}
    }
}
let turn = 'player1';

function handleCellClick(row, col, cell, boardType){
    console.log("row: " + row + " col: " + col + " board: " + boardType);
    
    if(turn === 'player1'){
        // Player1 can only click on opponent's board
        if(boardType !== 'opponent') {
            console.log("Player1 can only attack opponent's board!");
            return;
        }
        
        if(opponentBoard.checkboat(row,col)){
            cell.classList.add('hit');
            opponentBoard.receiveAttack(row,col);
            console.log("Hit!");
        } else {
            cell.classList.add('miss');
            console.log("Miss!");
        }
        turn = 'player2';
    }
    else if(turn === 'player2'){
        // Player2 can only click on player's board
        if(boardType !== 'player') {
            console.log("Player2 can only attack player's board!");
            return;
        }
        
        if(playerBoard.checkboat(row,col)){
            cell.classList.add('hit');
            playerBoard.receiveAttack(row,col);
            console.log("Hit!");
        } else {
            cell.classList.add('miss');
            console.log("Miss!");
        }
        turn = 'player1';
    }
    
    // Check for game over
    if(playerBoard.allShipsSunk()){
        console.log("Player2 Wins!");
    } else if(opponentBoard.allShipsSunk()){
        console.log("Player1 Wins!");
    }
}
function gameLoop(playerBoard,opponentBoard,player,opponent){

   addShipsToBoard(playerBoard);
   addShipsToBoard(opponentBoard);
    
   
   
}

function placeShips(playerBoard,opponentBoard,player,opponent){
    //TODO: Add manual ship placement logic
}




function addShipsToBoard(board) {
    // Add ships to the board
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if(Math.random() > 0.9){
                board.placeShip(row, col, "ship");
                console.log("Placing ship at " + row + ", " + col);
                board.board[row][col].element.style.backgroundColor = '#4dabf7';
                board.board[row][col].element.classList.add('ship');
            }
        }
    }

    
}

playerBoard.createGameBoard();
opponentBoard.createGameBoard();
createGrid(playerboard, 10, playerBoard, 'player');
createGrid(opponentboard, 10, opponentBoard, 'opponent');
gameLoop(playerBoard, opponentBoard, 'player', 'opponent');
addShipsToBoard(playerBoard, opponentBoard);