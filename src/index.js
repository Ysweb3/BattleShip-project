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



function createGrid(boardElement, size = 10,board) {
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
            

            cell.addEventListener('mouseOver', () => {
                if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
                    cell.style.backgroundColor = '#868585ff';
                }
            });
            
            cell.addEventListener('mouseLeave', () => {
                if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
                    cell.style.backgroundColor = '#f0f0f0';
                }
            });
            
           
            cell.addEventListener('click', () => handleCellClick(row, col, cell));
            
            boardElement.appendChild(cell);

            board.addElementToCell(row, col, cell);//this connets the display board to the game board

}
    }
}

function handleCellClick(row, col, cell){
    console.log("row: " + row + " col: " + col);
    if(playerBoard.board[row][col].hasShip||opponentBoard.board[row][col].hasShip ){
        cell.style.backgroundColor = '#ff1717ff';
    }
 
}
function gameLoop(playerBoard,opponentBoard,player,opponent){
//first place ships function is called to wait till all ships are placed
//then gameloop will start
//in gameloop first player will attack then opponent will attack
//whilst checking for allShipsSunk to declare winner and end   
   addShipsToBoard(playerBoard);
   addShipsToBoard(opponentBoard)
   
}

function placeShips(playerBoard,opponentBoard,player,opponent){
    
}

function checkWinner(playerBoard,opponentBoard,player,opponent){
    
}


function addShipsToBoard(board) {
    // Add ships to the board
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if(Math.random() > 0.85){
                board.placeShip(row, col);
                console.log("Placing ship at " + row + ", " + col);
                board.board[row][col].element.style.backgroundColor = '#4dabf7';
            }
        }
    }

    
}

playerBoard.createGameBoard();
opponentBoard.createGameBoard();
createGrid(playerboard, 10, playerBoard);
createGrid(opponentboard, 10, opponentBoard);
gameLoop(playerBoard, opponentBoard, 'player', 'opponent');
addShipsToBoard(playerBoard, opponentBoard);