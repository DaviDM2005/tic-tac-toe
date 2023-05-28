// JavaScript
let currentPlayer = 'X';
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

function makeMove(row, col) {
  if (board[row][col] === '') {
    board[row][col] = currentPlayer;
    document.getElementById('board').children[row * 3 + col].innerText = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    checkWinner();
  }
}

function showWinner(player) {
  document.getElementById('resultMessage').innerText = `Player ${player} wins!`;
  openModal();
}

function showDraw() {
  document.getElementById('resultMessage').innerText = "It's a draw!";
  openModal();
}

function openModal() {
  const modal = document.getElementById('resultModal');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('resultModal');
  modal.style.display = 'none';
}

function checkWinner() {
  const winningCombos = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    const [rowA, colA] = a;
    const [rowB, colB] = b;
    const [rowC, colC] = c;

    if (
      board[rowA][colA] !== '' &&
      board[rowA][colA] === board[rowB][colB] &&
      board[rowA][colA] === board[rowC][colC]
    ) {
      showWinner(board[rowA][colA]);
      return;
    }
  }

  if (board.flat().every(cell => cell !== '')) {
    showDraw();
  }
}

function resetBoard() {
  currentPlayer = 'X';
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  const cells = document.getElementsByClassName('cell');
  for (let cell of cells) {
    cell.innerText = '';
  }

  closeModal();
}
