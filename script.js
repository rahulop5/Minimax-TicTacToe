const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.querySelector('.status-message');
const restartButton = document.querySelector('.restart-button');


let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let actions=[1,1,1,1,1,1,1,1,1];
let result=['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    
    console.log(checkForWinner());
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusMessage.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        if(currentPlayer==="X"){
            return 1;
        }
        else{
            return -1;
        }
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusMessage.textContent = `It's a draw!`;
        gameActive = false;
        return 0;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `It's ${currentPlayer}'s turn`;
    return null;
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusMessage.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

statusMessage.textContent = `It's ${currentPlayer}'s turn`;



function utility(){
    return checkForWinner();
}

function minValue(){
    if(terminalState()){
        return utility();
    }
    else{
        var v=-100000;
        // for each action
        var emptyspaces=[];
        gameState.map((box, index)=>{
            if(box===""){
                emptyspaces.push(index);
            }
        });
    }
}

function maxValue(){
    if(terminalState()){
        return utility();
    }
    else{
        var v=100000;
        // for each action
        var emptyspaces=[];
        gameState.map((box, index)=>{
            if(box===""){
                emptyspaces.push(index);
            }
        });

    }
}

function terminalState(){
    if(checkForWinner()===0||checkForWinner()===1||checkForWinner===-1){
        return true;
    }
    return false;
}



