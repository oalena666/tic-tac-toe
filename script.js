const board = document.getElementById("board");
const winnerText = document.getElementById("winner");
const restartButton = document.getElementById("restart");
let currentPlayer = "x";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], 
        [0,3,6], [1,4,7], [2,5,8], 
        [0,4,8], [2,4,6]
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winnerText.style.display = "block";
            startConfetti();
            board.removeEventListener("click", handleClick);
            return true;
        }
    }
    return false;
}

function startConfetti() {
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

function computerMove() {
    let emptyCells = gameBoard.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
    if (emptyCells.length === 0) return;
    
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoard[move] = "o";
    document.querySelector(`[data-index='${move}']`).classList.add("o");
    document.querySelector(`[data-index='${move}']`).textContent = "O";
    
    checkWinner();
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;
    if (!gameBoard[index]) {
        gameBoard[index] = "x";
        cell.classList.add("x");
        cell.textContent = "X";
        
        if (!checkWinner()) {
            setTimeout(computerMove, 500);
        }
    }
}

function initBoard() {
    board.innerHTML = "";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        board.appendChild(cell);
    }
    board.addEventListener("click", handleClick);
    winnerText.style.display = "none";
}

restartButton.addEventListener("click", initBoard);

initBoard();
