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
const turnDisplay = document.getElementById('turn');
const ships = document.querySelectorAll('.ships');
const carrier = document.getElementById('carrier');
const battleship = document.getElementById('battleship');
const cruiser = document.getElementById('cruiser');
const submarine = document.getElementById('submarine');
const destroyer = document.getElementById('destroyer');
const playername = document.getElementById('player-name');
const opponentname = document.getElementById('opponent-name');

let turn = 'player1';
let totalShips = 5;
let selectedShip = null;
let shipTypes = [
    { name: 'carrier', length: 5 },
    { name: 'battleship', length: 4 },
    { name: 'cruiser', length: 3 },
    { name: 'submarine', length: 3 },
    { name: 'destroyer', length: 2 }
];

function placeShipManually(board,shipTypes){
    for(let i = 0; i < totalShips; i++){
        const ship = document.getElementById(shipTypes[i].name);
        ship.addEventListener('click', () => {
            console.log(shipTypes[i].name);
            console.log(shipTypes[i].length);
            selectedShip = shipTypes[i];
        })
    }
    // board.placeShip(row, col, "ship");
    // console.log("Placing ship at " + row + ", " + col);
    // board.board[row][col].element.style.backgroundColor = '#4dabf7';
    // board.board[row][col].element.classList.add('ship');
    // console.log(rowboard);
    // console.log(colboard);

}


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
            cell.style.borderRadius = '2px';
            cell.style.backgroundColor = '#f0f0f0';
            cell.style.cursor = 'pointer';
            cell.style.transition = 'background-color 0.6s';// Smooth transition for hover effect change this to make it faster or slower
            

            cell.addEventListener('mouseover', () => {
                if (!cell.classList.contains('hit') && !cell.classList.contains('miss') && !cell.classList.contains('ship') ) {
                    cell.style.backgroundColor = '#de7cb0ff';
                }
            });
            
            cell.addEventListener('mouseleave', () => {
                if (!cell.classList.contains('hit') && !cell.classList.contains('miss') && !cell.classList.contains('ship')) {
                    cell.style.backgroundColor = '#f0f0f0';
                }
            });
            
           
            cell.addEventListener('click', () => handleCellClick(row, col, cell,boardType));
            
            boardElement.appendChild(cell);

            board.addElementToCell(row, col, cell);//!Important this connects the display board to the game board

}
    }
}
let rowboard = 0;
let colboard = 0;

function handleCellClick(row, col, cell, boardType){
    console.log("row: " + row + " col: " + col + " board: " + boardType);
    rowboard = row;
    colboard = col;
    
    if(turn === 'player1' && !cell.classList.contains('hit') && !cell.classList.contains('miss')){
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
        turnDisplay.textContent = 'Player 2\'s turn';
    }
    else if(turn === 'player2' && !cell.classList.contains('hit') && !cell.classList.contains('miss')){
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
        turnDisplay.textContent = 'Player 1\'s turn';
    }
    
    // Check for game over
    if(playerBoard.allShipsSunk()){
        console.log("Player2 Wins!");
    } else if(opponentBoard.allShipsSunk()){
        console.log("Player1 Wins!");
    }
}
function gameLoop(playerBoard,opponentBoard,player,opponent){

    
    playerBoard.createGameBoard();
    opponentBoard.createGameBoard();
    createGrid(playerboard, 10, playerBoard, 'player');
    createGrid(opponentboard, 10, opponentBoard, 'opponent');
    addShipsToBoard(playerBoard);
    addShipsToBoard(opponentBoard);
   
}





function addShipsToBoard(board) {
    // Add ships to the board
    // for (let row = 0; row < 10; row++) {
    //     for (let col = 0; col < 10; col++) {
    //         if(Math.random() > 0.9){
    //             board.placeShip(row, col, "ship");
    //             // console.log("Placing ship at " + row + ", " + col);
    //             board.board[row][col].element.style.backgroundColor = '#4dabf7';
    //             board.board[row][col].element.classList.add('ship');
    //         }
    //     }
    // }

    
}


gameLoop(playerBoard, opponentBoard, 'player', 'opponent');
addShipsToBoard(playerBoard, opponentBoard);
placeShipManually(playerBoard,shipTypes);