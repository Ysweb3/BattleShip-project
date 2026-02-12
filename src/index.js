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
const playername = document.getElementById('player-name');
const opponentname = document.getElementById('opp-name');
const randomizeButton = document.getElementById('randomize');

let turn = 'player1';
let shipTypes = [
    { name: 'carrier', length: 5 },
    { name: 'battleship', length: 4 },
    { name: 'cruiser', length: 3 },
    { name: 'submarine', length: 3 },
    { name: 'destroyer', length: 2 }
];

// Random ship placement function
function placeShipsRandomly(board, shipTypes) {
    shipTypes.forEach(shipType => {
        let placed = false;
        let attempts = 0;
        const maxAttempts = 100;
        
        while (!placed && attempts < maxAttempts) {
            const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            
            if (canPlaceShip(board, row, col, shipType.length, orientation)) {
                placeShip(board, row, col, shipType, orientation);
                placed = true;
                console.log(`Placed ${shipType.name} at (${row}, ${col}) ${orientation}`);
            }
            attempts++;
        }
        
        if (!placed) {
            console.error(`Failed to place ${shipType.name} after ${maxAttempts} attempts`);
        }
    });
}

function canPlaceShip(board, row, col, length, orientation) {
    if (orientation === 'horizontal') {
        if (col + length > 10) return false;
        for (let i = 0; i < length; i++) {
            if (board.board[row][col + i].hasShip) return false;
        }
    } else {
        if (row + length > 10) return false;
        for (let i = 0; i < length; i++) {
            if (board.board[row + i][col].hasShip) return false;
        }
    }
    return true;
}

function placeShip(board, row, col, shipType, orientation) {
    const ship = new Ship(shipType.length, shipType.name);
    
    for (let i = 0; i < shipType.length; i++) {
        const currentRow = orientation === 'horizontal' ? row : row + i;
        const currentCol = orientation === 'horizontal' ? col + i : col;
        
        board.placeShip(currentRow, currentCol, ship);
        
        // Update UI for player board only
        if (board === playerBoard && board.board[currentRow][currentCol].element) {
            board.board[currentRow][currentCol].element.style.backgroundColor = '#4dabf7';
            board.board[currentRow][currentCol].element.classList.add('ship');
        }
    }
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
function setboards(playerBoard,opponentBoard,player,opponent){

    playerBoard.createGameBoard();
    opponentBoard.createGameBoard();
    createGrid(playerboard, 10, playerBoard, player);
    createGrid(opponentboard, 10, opponentBoard, opponent);
   
    
  
   
}
function setUsername(){
    //get user input
    //set user name
    const name = prompt("Enter your name:");
    playername.textContent = name;
    opponentname.textContent = "Opponent";
}


function gamePhase(){
    setUsername();
    setboards(playerBoard, opponentBoard, 'player', 'opponent');
    
    // Place ships randomly for both players
    console.log("Placing ships for player...");
    placeShipsRandomly(playerBoard, shipTypes);
    
    console.log("Placing ships for opponent...");
    placeShipsRandomly(opponentBoard, shipTypes);
    
    console.log("All ships placed! Starting game...");
    turnDisplay.textContent = "Game Start! Player 1's turn";
    
   
    gameLoop();
}

function gameLoop() {
 
    console.log("Game is ready! Click on opponent's board to attack.");
}

randomizeButton.addEventListener('click', () => {
    
    placeShipsRandomly(playerBoard, shipTypes);
});

// Start 
gamePhase();
