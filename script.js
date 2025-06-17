const events = [
  "Someone is on mute", "Dog barking", "Tech issue", "Awkward silence", 
  "Someone joins late", "Frozen screen", "Echo sound", "Coffee mention",
  "Interrupting", "Buzzword used", "Keyboard sounds", "Someone leaves early",
  "Virtual background fail", "Baby noise", "Long pause", "Mic too loud",
  "Talking over each other", "Late start", "Wrong screen shared", "Name mispronounced",
  "Meeting goes over", "Unmute fail", "Connection lost", "Someone multitasking"
];

let board = document.getElementById('bingo-board');
let message = document.getElementById('message');

let selected = Array(25).fill(false);

// Shuffle and insert free space
function generateBoard() {
  let shuffled = events.sort(() => 0.5 - Math.random()).slice(0, 24);
  shuffled.splice(12, 0, "FREE");

  shuffled.forEach((event, i) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = event;
    if (i === 12) {
      tile.classList.add('selected');
      selected[i] = true;
    }
    tile.addEventListener('click', () => toggleTile(tile, i));
    board.appendChild(tile);
  });
}

function toggleTile(tile, i) {
  if (i === 12) return; // Free space, always selected
  selected[i] = !selected[i];
  tile.classList.toggle('selected');
  checkBingo();
}

function checkBingo() {
  const wins = [
    // Rows
    [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
    // Columns
    [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
    // Diagonals
    [0,6,12,18,24],[4,8,12,16,20]
  ];
  for (let combo of wins) {
    if (combo.every(i => selected[i])) {
      message.textContent = "BINGO!!";
      message.classList.add('bingo');
      return;
    }
  }
  message.textContent = "Office Bingo";
  message.classList.remove('bingo');
}

generateBoard();
