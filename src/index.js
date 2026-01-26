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

playerBoard.createGameBoard();

function createGrid(boardElement, size = 10) {
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
            cell.style.transition = 'background-color 0.2s';
            

            cell.addEventListener('mouseenter', () => {
                if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
                    cell.style.backgroundColor = '#868585ff';
                }
            });
            
            cell.addEventListener('mouseleave', () => {
                if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
                    cell.style.backgroundColor = '#f0f0f0';
                }
            });
            
           
            cell.addEventListener('click', () => handleCellClick(row, col, cell));
            
            boardElement.appendChild(cell);


}
    }
}

function handleCellClick(row, col, cell){
    console.log("row: " + row + " col: " + col);
    cell.style.backgroundColor = '#ff0000';
    cell.classList.add('miss');
}

createGrid(playerboard, 10);
createGrid(opponentboard, 10);