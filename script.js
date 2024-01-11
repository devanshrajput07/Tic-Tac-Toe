const board = document.getElementById("board");
const cells = [];

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

const currentPlayerDisplay = document.getElementById("current-player");
const resetButton = document.getElementById("reset-button");
const resultMessage = document.getElementById("result-message");

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    checkWinner();
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      resultMessage.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      currentPlayerDisplay.textContent = "";
      return;
    }
  }

  if (!gameBoard.includes("")) {
    alert("It's a draw!");
    gameActive = false;
  }
}

createBoard();

resetButton.addEventListener("click", resetGame);

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;

  cells.forEach((cell) => {
    cell.textContent = "";
  });

  currentPlayer = "X";
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
}

currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
