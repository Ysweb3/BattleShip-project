import { Ship } from '../modules/ship.js';





export function placeShipOnBoard(board, row, col, shipType, orientation = 'horizontal') {
    // Create a new Ship object
    const ship = new Ship(shipType.length, shipType.name);
    
    // Check if placement is valid
    if (isValidPlacement(board, row, col, shipType.length, orientation)) {
        // Place the ship
        for (let i = 0; i < shipType.length; i++) {
            const currentRow = orientation === 'horizontal' ? row : row + i;
            const currentCol = orientation === 'horizontal' ? col + i : col;
            
            board.placeShip(currentRow, currentCol, ship);
            
            // Update UI
            if (board.board[currentRow][currentCol].element) {
                board.board[currentRow][currentCol].element.style.backgroundColor = '#4dabf7';
                board.board[currentRow][currentCol].element.classList.add('ship');
            }
        }
        
        console.log(`Placed ${shipType.name} at (${row}, ${col}) ${orientation}`);
        return true;
    }
    
    console.log(`Invalid placement for ${shipType.name} at (${row}, ${col}) ${orientation}`);
    return false;
}

function isValidPlacement(board, row, col, length, orientation) {
    // Check bounds
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