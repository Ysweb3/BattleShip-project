import { Ship } from '../modules/ship';

test('creates a ship with the correct length', () => {
    const ship1 = new Ship(5);
    expect(ship1.length).toBe(5);
});
test('checking the sinking of ships',() =>{
    const ship2 = new Ship(2);
    ship2.hit();
    ship2.hit();
    ship2.hit();
    expect(ship2.isSunk()).toBe(true);
})
test('checking the number of hits', () =>{
    const ship3 = new Ship(3);
    ship3.hit();
    ship3.hit();
    expect(ship3.hits).toBe(2);
})
test('checking the ship name', () =>{
    const ship3 = new Ship(3);
    ship3.name = "Battleship";
    expect(ship3.name).toBe("Battleship");
})
test('checking for negative or zero length', () => {
    // Test negative length
    expect(() => new Ship(-2, "Invalid Ship")).toThrow("Ship length must be a positive number");
    
    // Test zero length
    expect(() => new Ship(0, "Zero Ship")).toThrow("Ship length must be a positive number");
    
    // Test non-number length
    expect(() => new Ship("not a number", "Invalid Ship")).toThrow("Ship length must be a positive number");
});