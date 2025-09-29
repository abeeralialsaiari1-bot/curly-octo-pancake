
let board=["","","","","","","","",""];
let currentPlayer,playerSymbol,computerSymbol,gameActive=false,round=1,playerWins=0,computerWins=0,timerInterval;

const winningConditions=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function startGame() {
    document.getElementById("start-message").style.display="none";
    document.getElementById("game-container").style.display="block";
}

function selectSymbol(symbol) {
    playerSymbol=symbol;
    computerSymbol=symbol==="X"?"O":"X";
    currentPlayer=playerSymbol;
    gameActive=true;
    startTimer();
}

function startTimer() {
    let startTime = new Date();
    timerInterval = setInterval(() => {
        let now = new Date();
        let elapsed = new Date(now - startTime);
        let minutes = String(elapsed.getUTCMinutes()).padStart(2, '0');
        let seconds = String(elapsed.getUTCSeconds()).padStart(2, '0');
        document.getElementById("timer").textContent = minutes + ":" + seconds;
    }, 1000);
}

function makeMove(cell,index) {
    if(board[index]===""&&gameActive&&currentPlayer===playerSymbol) {
        board[index]=currentPlayer;
        cell.textContent=currentPlayer;
        checkResult();
        currentPlayer=computerSymbol;
        if(gameActive&&currentPlayer===computerSymbol) setTimeout(computerMove,500);
    }
}

function computerMove() {
    let emptyCells=board.map((val,index)=>val===""?index:null).filter(val=>val!==null);
    if(emptyCells.length>0) {
        let randomIndex=emptyCells[Math.floor(Math.random()*emptyCells.length)];
        board[randomIndex]=computerSymbol;
        document.querySelectorAll(".cell")[randomIndex].textContent=computerSymbol;
        checkResult();
        currentPlayer=playerSymbol;
    }
}

function checkResult() {
    let roundWon=false;
    for(let i=0;i<winningConditions.length;i++) {
        const[a,b,c]=winningConditions[i];
        if(board[a]&&board[a]===board[b]&&board[a]===board[c]) {
            roundWon=true;
            break;
        }
    }

    if(roundWon) {
        gameActive=false;
        document.getElementById("message").textContent=currentPlayer===playerSymbol?"لقد فزت!":"خسرت!";
        nextRound();
    } else if(!board.includes("")) {
        document.getElementById("message").textContent="تعادل!";
        gameActive=false;
        nextRound();
    }
}

function nextRound() {
    if (round < 3) {
        round++;
        document.getElementById("round").textContent = round;
        setTimeout(resetBoard, 2000);
    } else {
        clearInterval(timerInterval);
        document.getElementById("message").textContent =
            'المباراة انتهت! النتائج: أنت ' + playerWins + ' - الكمبيوتر ' + computerWins + '.';
        document.getElementById("result-screen").style.display = "flex";
        document.getElementById("result-message").textContent =
            'النتيجة النهائية: ' + playerWins + ' - ' + computerWins;
    }
}

function resetBoard() {
    board=["","","","","","","","",""];
    document.querySelectorAll(".cell").forEach(cell=>cell.textContent="");
    document.getElementById("message").textContent="";
    gameActive=true;
    currentPlayer=playerSymbol;
}

function resetGame() {
    round=1;
    playerWins=0;
    computerWins=0;
    clearInterval(timerInterval);
    document.getElementById("timer").textContent="00:00";
    startTimer();
    resetBoard();
    document.getElementById("round").textContent=round;
    document.getElementById("message").textContent="";
    document.querySelector("button").style.display="none";
}