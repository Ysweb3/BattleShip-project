import { Gameboard } from '../modules/gameboard';

test('creates a Gameboard', () => {
    const testGameboard = new Gameboard();
    expect(testGameboard.board.length).toBe(10);
});
test('testing a cell', () => {
    const testGameboard = new Gameboard();
    expect(testGameboard.board[0][0].hasShip).toBe(false);
});
test('testing hits', () => {
    const testGameboard = new Gameboard();
    expect(testGameboard.board[0][0].isHit).toBe(false);
});
test('testing a ship placement', () => {
    const testGameboard = new Gameboard();
    testGameboard.placeShip(0,0);
    expect(testGameboard.board[0][0].hasShip).toBe(true);
}); 
test('testing a attack', () => {
    const testGameboard = new Gameboard();
    testGameboard.placeShip(0,0);
    testGameboard.receiveAttack(0,0);
    expect(testGameboard.board[0][0].isHit).toBe(true);
}); 
test('testing allShipsSunk', () => {
    const testGameboard = new Gameboard();
    testGameboard.placeShip(0,0);
    testGameboard.placeShip(0,1);
    testGameboard.receiveAttack(0,0);
    testGameboard.receiveAttack(0,1);
    expect(testGameboard.allShipsSunk()).toBe(true);
}); 
