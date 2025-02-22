let gamestate=["", "", "", "", "", "", "", "", ""];
let gameactive=true;
let currplayer="X";
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

const cells=document.querySelectorAll(".cell");
const statusMessage = document.querySelector('.status-message');
const restartButton = document.querySelector('.restart-button');
const cellsarray=Array.from(cells);

statusMessage.textContent=`Its ${currplayer}'s turn`;

cellsarray.map((cell)=>{
    cell.addEventListener("click", (event)=>{
        if(gameactive){
            const cellclicked=event.target;
            const cellclickedindex=cellsarray.indexOf(cellclicked);
            if(gamestate[cellclickedindex]===""){
                cellclicked.innerText=currplayer;
                gamestate[cellclickedindex]=currplayer;
                if(!isgameover()){
                    currplayer=(currplayer==="X")?"O":"X";
                    statusMessage.textContent=`Its ${currplayer}'s turn`;
                    if(currplayer==="O"){
                        const index=mini();
                        cellsarray[index].innerText="O";
                        gamestate[index]="O";
                        if(!isgameover()){
                            currplayer="X";
                            statusMessage.textContent=`Its ${currplayer}'s turn`;
                        }
                    }
                }
            }
        }
    })
});


restartButton.addEventListener("click", ()=>{
    gameactive=false;
    gamestate=["", "", "", "", "", "", "", "", ""];
    currplayer="X";
    cellsarray.map((cell)=>{
        cell.textContent="";
    });
    statusMessage.textContent=`Its ${currplayer}'s turn`
    gameactive=true;
});

function isgameover() {
    return winningCombinations.some((combi) => {
        if (gamestate[combi[0]] !== "" && gamestate[combi[0]] === gamestate[combi[1]] && gamestate[combi[1]] === gamestate[combi[2]]) {
            statusMessage.textContent = `${currplayer} won!`;
            gameactive = false;
            return true;
        }
        else if(!gamestate.includes("")){
            statusMessage.textContent = `Its a Draw`;
            gameactive = false;
            return true;
        }
        return false;
    });
}


function mini() {
    let index = -1;
    let best = Infinity;
    for (var i = 0; i < gamestate.length; i++) {
        if (gamestate[i] === "") {
            gamestate[i] = "O"; 
            let temp = maxvalue();
            if (temp < best) {
                index = i;
                best = temp;
            }
            gamestate[i] = ""; 
        }
    }
    return index;
}

function minvalue() {
    let result = checkWinner();
    if (result !== null) {
        return result; 
    }
    
    let best = Infinity;
    for (var i = 0; i < gamestate.length; i++) {
        if (gamestate[i] === "") {
            gamestate[i] = "O"; 
            best = Math.min(best, maxvalue());
            gamestate[i] = "";
        }
    }
    return best;
}

function maxvalue() {
    let result = checkWinner();
    if (result !== null) {
        return result; 
    }
    
    let best = -Infinity;
    for (var i = 0; i < gamestate.length; i++) {
        if (gamestate[i] === "") {
            gamestate[i] = "X"; 
            best = Math.max(best, minvalue());
            gamestate[i] = ""; 
        }
    }
    return best;
}

function utility() {
    let result = checkWinner();
    if (result !== null) {
        let noofemptyspaces = gamestate.filter(cell => cell === "").length;
        if (result === 1) {
            return 1 + noofemptyspaces; 
        } else if (result === -1) {
            return -1 - noofemptyspaces; 
        } else {
            return 0;
        }
    }
    return null; 
}

function checkWinner() {
    for (const combi of winningCombinations) {
        if (gamestate[combi[0]] === "X" && gamestate[combi[1]] === "X" && gamestate[combi[2]] === "X") {
            return 1;
        } 
        if (gamestate[combi[0]] === "O" && gamestate[combi[1]] === "O" && gamestate[combi[2]] === "O") {
            return -1; 
        }
    }
    if (!gamestate.includes("")) {
        return 0; 
    }
    return null;
}