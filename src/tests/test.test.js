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