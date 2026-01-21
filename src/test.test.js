import { Ship } from './index.js';

test('creates a ship with the correct length', () => {
    const ship = new Ship(5);
    expect(ship.length).toBe(5);
});