const myVars = {
  boardLength: 3,
  myBoard: [...document.querySelectorAll(".cellInTheBoard")],
  arrOfTheBoard: [],
  isComputerPlay: false,
  player1Score: document.querySelector(".ply1-score"),
  player2Score: document.querySelector(".ply2-score"),
  isPlayer1: true,
  sendFromPc: false,
  reset: document.querySelector(".reset-btn"),
  resetBoard: document.querySelector(".reset-btn"),
  activatedChar: "",
  boardSpace: document.querySelector(".board-space"),
  audio: document.querySelector(".audio"),
  audioWinTurn: document.querySelector(".audio-win-turn"),
  audioWinGame: document.querySelector(".audio-win-game"),
  newGameBtn: document.querySelector(".new-btn"),
  settingForm: document.querySelector(".setting-form"),
  formNewGame: document.querySelector(".new-game-form"),
  bigContainer: document.querySelector(".big-container"),
  submitNewGame: document.querySelector(".submit"),
  ply1Name: document.querySelector(".set-ply1-name"),
  ply2Name: document.querySelector(".set-ply2-name"),
  ply1NameInGame: document.querySelector(".ply1-name"),
  ply2NameInGame: document.querySelector(".ply2-name"),
  boardSize: document.querySelector(".set-board-size"),
  errorMessage: document.querySelector(".error-message"),
  winnerName: document.querySelector(".winner-name"),
  player1Amount: document.querySelector(".player1-amount"),
  player2Amount: document.querySelector(".player2-amount"),
  TheWinner: document.querySelector(".the-winner"),
  countDownDiv: document.querySelector(".count-down"),
  countUpDiv: document.querySelector(".count-up"),
  pcPhoto: document.querySelector(".pc-photo"),
  isWin: false,
  countWins: {
    player1: 0,
    player2: 0,
  },
};
myVars.pcPhoto.addEventListener("click", function () {
  myVars.isComputerPlay = !myVars.isComputerPlay;
  myVars.ply2Name.value === ""
    ? (myVars.ply2Name.value = "Computer")
    : (myVars.ply2Name.value = "");
});

myVars.newGameBtn.addEventListener("click", function () {
  myVars.bigContainer.style.display = "none";
  myVars.formNewGame.style.display = "flex";
  myVars.player1Score.textContent = 0;
  myVars.player2Score.textContent = 0;
});
myVars.submitNewGame.addEventListener("click", function (event) {
  event.preventDefault();
  if (myVars.ply2Name.value === "Computer") myVars.isComputerPlay = true;
  else myVars.isComputerPlay = false;
  if (
    myVars.ply1Name.value === "" ||
    myVars.ply2Name.value === "" ||
    myVars.boardSize.value === ""
  ) {
    myVars.errorMessage.style.display = "block";
    myVars.errorMessage.textContent =
      "The names and the size bords are required!";
  } else if (myVars.boardSize.value < 3 || myVars.boardSize.value > 20) {
    myVars.errorMessage.style.display = "block";
    myVars.errorMessage.textContent = "Please enter a normal Board size!";
  } else {
    myVars.errorMessage.style.display = "none";
    myVars.formNewGame.style.display = "none";
    myVars.bigContainer.style.display = "flex";
    myVars.boardSpace.style.display = "flex";
    myVars.TheWinner.style.display = "none";
    myVars.countWins.player1 = 0;
    myVars.countWins.player2 = 0;
    myVars.player1Score.textContent = 0;
    myVars.player2Score.textContent = 0;
    myVars.player1Amount.textContent = "";
    myVars.player2Amount.textContent = "";
    myVars.ply1NameInGame.textContent = myVars.ply1Name.value;
    myVars.ply2NameInGame.textContent = myVars.ply2Name.value;
    myVars.boardLength = myVars.boardSize.value;
    myVars.ply1Name.value = "";
    myVars.ply2Name.value = "";
    myVars.boardSize.value = "";
    createABoard();
    clearInterval(countingUp);
    countUp();
  }
});

let countingDown;
const countDown = function () {
  let seconds = myVars.boardLength * 10;
  myVars.countDownDiv.style.display = "block";
  secondPass;
  countingDown = setInterval(function () {
    secondPass();
  }, 1000);
  function secondPass() {
    let minutes = Math.floor(seconds / 60);
    let remSeconds = seconds % 60;
    if (seconds < 10) remSeconds = "0" + remSeconds;
    myVars.countDownDiv.innerHTML = "Turn time " + minutes + ":" + remSeconds;

    if (seconds > 0) {
      seconds = seconds - 1;
    } else {
      myVars.countDownDiv.style.display = "none";
      resetTheBoard();
    }
  }
};
let countingUp;
const countUp = function () {
  let seconds = 0;
  secondPass;
  countingUp = setInterval(function () {
    secondPass();
  }, 1000);
  function secondPass() {
    let minutes = Math.floor(seconds / 60);
    let remSeconds = seconds % 60;
    if (remSeconds < 10) remSeconds = "0" + remSeconds;
    myVars.countUpDiv.innerHTML = "Game time " + minutes + ":" + remSeconds;

    if (minutes < 59) {
      seconds = seconds + 1;
    } else {
      createABoard();
    }
  }
};
const resetTheBoard = function () {
  myVars.isWin = false;
  for (let i = 0; i < myVars.arrOfTheBoard.length; i++) {
    for (let j = 0; j < myVars.arrOfTheBoard.length; j++) {
      myVars.arrOfTheBoard[i][j] = "-";
    }
  }

  myVars.myBoard.forEach((element) => {
    element.textContent = "-";
    element.style.color = "transparent";
  });
  if (
    +myVars.player1Score.textContent === 3 ||
    +myVars.player2Score.textContent === 3
  ) {
    myVars.player1Score.textContent = 0;
    myVars.player2Score.textContent = 0;
  }
  clearInterval(countingDown);
  countDown();
};

const createABoard = function () {
  myVars.arrOfTheBoard.length = 0;
  myVars.boardSpace.innerHTML = "";
  myVars.countWins.player1 = 0;
  myVars.countWins.player2 = 0;
  for (let i = 0; i < myVars.boardLength; i++) {
    myVars.arrOfTheBoard.push([]);
  }

  for (let i = 0; i < myVars.boardLength; i++) {
    const ul = document.createElement("ul");
    ul.setAttribute("key", i);
    ul.classList.add("ulClass");
    myVars.boardSpace.appendChild(ul);

    for (let j = myVars.arrOfTheBoard[i].length; j < myVars.boardLength; j++) {
      myVars.arrOfTheBoard[i].push("-");

      const li = document.createElement("li");
      li.setAttribute("key", j);
      li.setAttribute("class", "cellInTheBoard");

      ul.appendChild(li);
      li.textContent = myVars.arrOfTheBoard[i][j];
    }
  }
  myVars.myBoard = [...document.querySelectorAll(".cellInTheBoard")];
  if (myVars.boardLength >= 3 && myVars.boardLength <= 5) {
    myVars.boardSpace.style.width = "30%";
    myVars.boardSpace.style.margin = "auto";
    myVars.boardSpace.style.marginTop = 100 / myVars.boardLength - 12 + "%";
  } else if (myVars.boardLength > 5 && myVars.boardLength <= 8) {
    myVars.boardSpace.style.width = "50%";
    myVars.boardSpace.style.margin = "auto";
    myVars.boardSpace.style.marginTop = 100 / myVars.boardLength - 12 + "%";
  } else {
    myVars.boardSpace.style.width = "70%";
    myVars.boardSpace.style.margin = "auto";
  }

  myVars.myBoard.forEach((element) => {
    element.addEventListener("click", function (e) {
      if (element.textContent === "-") {
        myVars.audio.play();
        let color;

        if (!myVars.isComputerPlay) {
          if (myVars.isPlayer1) {
            myVars.activatedChar = "X";
            color = "orange";
          } else {
            color = "rgb(0, 217, 255)";
            myVars.activatedChar = "O";
          }
        }

        let placeOfLi;
        let placeOfUl;

        placeOfLi = e.target.getAttribute("key");
        placeOfUl = e.target.parentElement.getAttribute("key");
        if (myVars.isComputerPlay) {
          color = "orange";
          myVars.activatedChar = "X";
        }
        element.style.color = color;
        element.textContent = myVars.activatedChar;

        myVars.arrOfTheBoard[placeOfUl][placeOfLi] =
          myVars.activatedChar === "X" ? 1 : 0;
        if (!myVars.isWin) {
          myVars.sendFromPc = false;
          checkIfWin();
        }
        myVars.isPlayer1 = !myVars.isPlayer1;

        if (myVars.isComputerPlay) {
          if (!myVars.isWin) {
            // myVars.isPlayer1 = false;
            if (myVars.isComputerPlay) {
              const fillCells = [];
              for (let i = 0; i < myVars.arrOfTheBoard.length; i++) {
                for (let j = 0; j < myVars.arrOfTheBoard[i].length; j++) {
                  if (myVars.arrOfTheBoard[i][j] === "-") {
                    fillCells.push([i, j]);
                  }
                }
              }
              if (fillCells.length !== 0) {
                let computerChoice = Math.floor(
                  Math.random() * fillCells.length
                );
                placeOfLi = fillCells[computerChoice][1];
                placeOfUl = fillCells[computerChoice][0];
                placeUlInPage =
                  document.querySelectorAll("ul")[fillCells[computerChoice][0]];
                placeLiInPage =
                  placeUlInPage.children[fillCells[computerChoice][1]];
                color = "rgb(0, 217, 255)";
                myVars.activatedChar = "O";
                placeLiInPage.style.color = color;
                placeLiInPage.textContent = myVars.activatedChar;
                myVars.arrOfTheBoard[placeOfUl][placeOfLi] =
                  myVars.activatedChar === "X" ? 1 : 0;
                fillCells.length = 0;
                myVars.sendFromPc = true;
                checkIfWin();
              }
            }
          }
        }
      }
    });
  });
};

createABoard();
resetTheBoard();
myVars.ply1Name.focus();
myVars.reset.addEventListener("click", function () {
  resetTheBoard();
  myVars.boardSpace.style.display = "flex";
  myVars.TheWinner.style.display = "none";
  myVars.winnerName.textContent = "";
  console.log(myVars.player1Score.textContent, myVars.player2Score.textContent);
});

const checkIfWin = function () {
  let alahzon1 = 0;
  let alahzon2 = 0;

  for (let i = 0; i < myVars.arrOfTheBoard.length; i++) {
    let sumOfColumns = 0;
    let sumOfRows = 0;
    for (let j = 0; j < myVars.arrOfTheBoard.length; j++) {
      sumOfRows += myVars.arrOfTheBoard[i][j];
      sumOfColumns += myVars.arrOfTheBoard[j][i];

      if (i === j) {
        alahzon1 += myVars.arrOfTheBoard[i][j];
      }
      if (i + j === myVars.arrOfTheBoard.length - 1) {
        alahzon2 += myVars.arrOfTheBoard[i][j];
      }
    }

    if (
      sumOfColumns === myVars.arrOfTheBoard.length ||
      sumOfRows === myVars.arrOfTheBoard.length ||
      sumOfColumns === 0 ||
      sumOfRows === 0
    ) {
      addToScore();
    }
  }
  if (
    alahzon1 === 0 ||
    alahzon2 === 0 ||
    alahzon1 === myVars.arrOfTheBoard.length ||
    alahzon2 === myVars.arrOfTheBoard.length
  ) {
    addToScore();
  }
};

const addToScore = function () {
  if (!myVars.isWin) {
    myVars.audioWinTurn.play();
    let scoreOfPlayer1 = Number(myVars.player1Score.textContent);
    let scoreOfPlayer2 = Number(myVars.player2Score.textContent);
    // if (myVars.isPlayer1 === false) {
    if (myVars.isComputerPlay) {
      if (myVars.sendFromPc) {
        scoreOfPlayer1++;
      } else {
        scoreOfPlayer2++;
      }
    } else if (myVars.isPlayer1) {
      scoreOfPlayer2++;
    } else {
      scoreOfPlayer1++;
    }

    myVars.player1Score.textContent = scoreOfPlayer1;
    myVars.player2Score.textContent = scoreOfPlayer2;
    setTimeout(() => {
      resetTheBoard();
    }, 2000);
    if (scoreOfPlayer1 === 3 || scoreOfPlayer2 === 3) {
      clearInterval(countingDown);
      myVars.audioWinGame.play();
      myVars.countDownDiv.style.display = "none";
      myVars.boardSpace.style.display = "none";
      myVars.TheWinner.style.display = "flex";
      if (scoreOfPlayer1 < scoreOfPlayer2) {
        myVars.winnerName.textContent =
          `🏆 ` + myVars.ply1NameInGame.textContent + ` Win's 🏆`;
        myVars.countWins.player1++;
        myVars.player1Amount.textContent = ` ${myVars.ply1NameInGame.textContent} : ${myVars.countWins.player1}`;
        myVars.player2Amount.textContent = ` ${myVars.ply2NameInGame.textContent} : ${myVars.countWins.player2}`;
      } else {
        myVars.winnerName.textContent =
          `🏆 ` + myVars.ply2NameInGame.textContent + ` Win's 🏆`;
        myVars.countWins.player2++;
        myVars.player1Amount.textContent = ` ${myVars.ply1NameInGame.textContent} : ${myVars.countWins.player1}`;
        myVars.player2Amount.textContent = ` ${myVars.ply2NameInGame.textContent} : ${myVars.countWins.player2}`;
      }
    }
    myVars.isWin = true;
  }
};
