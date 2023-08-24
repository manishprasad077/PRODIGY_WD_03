const boxs = document.querySelectorAll('.box');
const statusTxt = document.querySelector('#status');
const btnRestart = document.querySelector('#restart');
let x = "<img src='images/x new.png'>";
let o = "<img src='images/o.png'>";

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;
init();

function init() {
    boxs.forEach(box => box.addEventListener('click', boxClick));
    btnRestart.addEventListener('click', restartGame);
    statusTxt.textContent = `${player} Your Turn`;
    running = true;
}

// ... Your existing code ...

function nextPlayer(player) {
          return player === 'X' ? 'O' : 'X';
      }
      
      function minimax(newBoard, player) {
          // Base cases
          if (checkWinner(newBoard, 'X')) {
              return -1;
          } else if (checkWinner(newBoard, 'O')) {
              return 1;
          } else if (!newBoard.includes("")) {
              return 0;
          }
      
          let scores = [];
          let moves = [];
      
          for (let i = 0; i < newBoard.length; i++) {
              if (newBoard[i] === '') {
                  let possibleBoard = [...newBoard];
                  possibleBoard[i] = player;
                  let score = minimax(possibleBoard, nextPlayer(player));
                  scores.push(score);
                  moves.push(i);
              }
          }
      
          if (player === 'O') {
              let maxScoreIndex = scores.indexOf(Math.max(...scores));
              return scores[maxScoreIndex];
          } else {
              let minScoreIndex = scores.indexOf(Math.min(...scores));
              return scores[minScoreIndex];
          }
      }
      
      function bestMove() {
    const availableMoves = [];

    for (let i = 0; i < options.length; i++) {
        if (options[i] === '') {
            availableMoves.push(i);
        }
    }

    if (availableMoves.length === 0) {
        return -1; // No available moves
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
}

      
      // ... Your existing code ...
      

function boxClick() {
    const index = this.dataset.index;
    if (options[index] !== "" || !running) {
        return;
    }

    if (player === "O") {
        const aiMove = bestMove();
        updateBox(boxs[aiMove], aiMove);
        checkWinner();
    } else {
        // Human player's turn
        updateBox(this, index);
        checkWinner();
    }
}

function updateBox(box, index) {
    options[index] = player;
    box.innerHTML = currentPlayer;
}

function changePlayer() {
    player = (player == 'X') ? "O" : "X";
    currentPlayer = (currentPlayer == x) ? o : x;
    statusTxt.textContent = `${player} Your Turn`;
}

function checkWinner(){
          let isWon=false;
          for(let i=0;i<win.length;i++){
            const condition=win[i]; //[0,1,2]
            const box1=options[condition[0]]; //x
            const box2=options[condition[1]]; //''
            const box3=options[condition[2]]; //''
            if(box1=="" || box2=="" || box3==""){
              continue;
            }
            if(box1==box2 && box2==box3){
              isWon=true;
              boxs[condition[0]].classList.add('win');
              boxs[condition[1]].classList.add('win');
              boxs[condition[2]].classList.add('win');
            }
          }
        
          if(isWon){
            statusTxt.textContent=`${player} Won..`;
            running=false;
            triggerConfetti(); 
          }else if(!options.includes("")){
            statusTxt.textContent=`Game Draw..!`;
            running=false;
          }else{
            changePlayer();
          }
        }
        

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = x;
    player = "X";
    running = true;
    statusTxt.textContent = `${player} Your Turn`;

    boxs.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    });
}
