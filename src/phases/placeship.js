export default function renderPlaceShip() {
    // Create header
    const header = document.createElement('div');
    header.id = 'header';
    const headerP = document.createElement('p');
    headerP.textContent = 'Battleship';
    header.appendChild(headerP);
    document.body.appendChild(header);

    // Create ship container
    const shipContainer = document.createElement('div');
    shipContainer.id = 'shipContainer';

    // Create ships
    const ships = [
        { id: 'carrier', name: 'carrier', length: 5 },
        { id: 'battleship', name: 'battleship', length: 4 },
        { id: 'cruiser', name: 'cruiser', length: 3 },
        { id: 'submarine', name: 'submarine', length: 3 },
        { id: 'destroyer', name: 'destroyer', length: 2 }
    ];

    ships.forEach(ship => {
        const shipDiv = document.createElement('div');
        shipDiv.id = ship.id;
        shipDiv.className = 'ships';
        shipDiv.textContent = `  ${ship.name} `;
        
        const span = document.createElement('span');
        span.textContent = ` ${ship.length}`;
        shipDiv.appendChild(span);
        
        shipContainer.appendChild(shipDiv);
    });

    document.body.appendChild(shipContainer);

    
    return true;

}

 export function placeShipManually(board,shipTypes){
    for(let i = 0; i < totalShips; i++){
        const ship = document.getElementById(shipTypes[i].name);
        ship.addEventListener('click', () => {
            selected = true;
            selectedShip = shipTypes[i];


            console.log(selectedShip)
            console.log(selected)
        })
    }
    board.placeShip(rowboard, colboard, "ship");
    console.log("Placing ship at " + rowboard + ", " + colboard);
    board.board[rowboard][colboard].element.style.backgroundColor = '#4dabf7';
    board.board[rowboard][colboard].element.classList.add('ship');
    console.log(rowboard);
    console.log(colboard);
    return 0;
    
}