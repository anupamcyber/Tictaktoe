const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//ket the game begin()
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //butoon hide
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //css
    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
  //dynamic paragrogh adding
  gameInfo.innerText = `Current Player :${currentPlayer}`;

  //ui modeify
}
//function ko call kiya
initGame();
//sabo boxes ma event listener add kro aur click krne ma background ko white kro
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// handle wala function box majab click hua hai
//thing to check 1
function handleClick(index) {
  //work only when the box is emplty
  if (gameGrid[index] === "") {
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}
//x lo ) kro and ) ko X kro
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player :${currentPlayer}`;
}
//check whetther the game is over or not
function checkGameOver() {
  //  console.log("first");
  //  newGameBtn.classList.add("active");
  let answer = "";
  winningPositions.forEach((position) => {
    //all boxes are nonempty and same in value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //x is winner
      if (gameGrid[position[0]] === "X") answer = "X";
      else answer = "O";
      //made sme more ui changes
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  //answer is non empty
  if (answer !== "") {
    gameInfo.innerText = `Winner Player :${answer}`;
    newGameBtn.classList.add("active");
    return;
  }
  //handle tie case
  let filledCount = 0;
  gameGrid.forEach((box) => {
    if (box != "") filledCount++;
  });
  if (filledCount === 9) {
    gameInfo.innerText = "Game Tie";
    newGameBtn.classList.add("active");
  }
}
//new game start karega
newGameBtn.addEventListener("click", initGame);
