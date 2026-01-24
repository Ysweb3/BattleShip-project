require("./styles.css"); // Commented out for now - CSS will be handled by webpack
import { Gameboard } from './modules/gameboard';
import { Ship } from './modules/ship';
import { RealPlayer } from './modules/player';
import { AIPlayer } from './modules/player';

const playerBoard = new Gameboard();
const opponentBoard = new Gameboard();
const player = new RealPlayer();
const opponent = new AIPlayer();

const ship1 = new Ship(5);
ship1.name = "Carrier";
playerBoard.placeShip(0,0);
playerBoard.addShipType(0,0,ship1.name);
console.log(playerBoard.checkShipType(0,0));