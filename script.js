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
        return false;
    });
}


