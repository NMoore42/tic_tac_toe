const newBoardElements = `<ul class="boxes">
                            <li class="box" style=""></li>
                            <li class="box" style=""></li>
                            <li class="box" style=""></li>
                            <li class="box" style=""></li>
                            <li class="box" style=""></li>
                            <li class="box" style=""></li>
                            <li class="box" style=""></li>
                            <li class="box" style=""></li>
                            <li class="box" style=""></li>
                          </ul>`




/**
* ====================================================
* EVENT LISTENERS
* ====================================================
*/

startGameForm.addEventListener("submit", newGameFetch)
gameDiv.addEventListener("mouseover", mouseOverSymbol)
gameDiv.addEventListener("mouseout", mouseOutClear)
gameDiv.addEventListener("click", submitTurn)
rematchButton.addEventListener("click", rematchGameFetch)
homePageButton.addEventListener("click", homePage)



/**
* ====================================================
* DOM RENDERERS
* ====================================================
*/

//Returns X or O .svg based on active player
function playerSymbol() {
  if (playerOneScore.className === "player-score active-player"){
    return "url('src/img/o.svg')"
  } else if (playerTwoScore.className === "player-score active-player"){
    return "url('src/img/x.svg')"
  }
}

function switchPlayers() {
  let active = "player-score active-player"
  let notActive = "player-score"
  if (playerOneScore.className === active) {
    playerOneScore.className = notActive
    playerTwoScore.className = active
  } else {
    playerOneScore.className = active
    playerTwoScore.className = notActive
  }
}

function playerChecked(){
  if (playerOneScore.className == "player-score active-player"){
    return 'box box-filled-1';
  } else if (playerTwoScore.className == "player-score active-player"){
    return 'box box-filled-2';
  }
}

function submitTurn() {
  let click = event.target
  if (click.tagName === "LI" && !click.className.includes("box-filled")) {
    click.className = playerChecked()
    winHandler()
    tieHandler()
  }
}

function tieHandler() {
  if (checkTie()) {
    endGame("Tie!")
  }
}

function checkTie() {
  return document.querySelectorAll('li.box-filled-1').length + document.querySelectorAll('li.box-filled-2').length === 9
}

function winHandler() {
  let winner = document.querySelector(".active-player").dataset.playerName
  checkWin() ? endGame(`${winner} wins!`) : switchPlayers()
}

function endGame(statement) {
  let winner = document.querySelector(".active-player").dataset.playerName
  let gameId = gameDiv.dataset.gameId
  let winnerId;
  if (statement === "Tie!") {
    winnerId = null
    winnerStats.style.display = "none"
  } else {
    winnerId = document.querySelector(".active-player").dataset.playerId
    winnerStats.style.display = "block"
  }
  winnerName.innerHTML = statement
  updateGameFetch(gameId, winnerId)
  winnerPopup.open()
  clearBoard()
}

function appendGamePage(gameData) {
  gameDiv.dataset.gameId = gameData.id
  playerOneScore.dataset.playerId = gameData.player_one_id
  playerOneScore.dataset.playerName = playerOneName.innerHTML
  playerTwoScore.dataset.playerName = playerTwoName.innerHTML
  playerTwoScore.dataset.playerId = gameData.player_two_id
  toggleDiv(playerDiv, "none")
  toggleDiv(gameLogo, "none")
  toggleDiv(gameContainer, "block")
  playerOneScore.className = "player-score active-player"
}

function toggleDiv(div, display) {
  div.style.display  = display
}

function mouseOverSymbol() {
  let mouseOver = event.target
  if (mouseOver.tagName === "LI" && !mouseOver.className.includes("box-filled")) {
    mouseOver.style.backgroundImage = playerSymbol()
  }
}

function mouseOutClear() {
  let mouseOut = event.target
  if (mouseOut.tagName === "LI" && !mouseOut.className.includes("box-filled")) {
    mouseOut.style.backgroundImage = ""
  }
}

function checkWinHelper(box1, box2, box3) {
  const boxes = document.querySelectorAll('li.box')
  return (boxes[box1].className === playerChecked() &&
  boxes[box2].className === playerChecked() &&
  boxes[box3].className === playerChecked())
}

function checkWin() {
  return (checkWinHelper(0, 1, 2) ||
      checkWinHelper(3, 4, 5) ||
      checkWinHelper(6, 7, 8) ||
      checkWinHelper(0, 3, 6) ||
      checkWinHelper(1, 4, 7) ||
      checkWinHelper(2, 5, 8) ||
      checkWinHelper(0, 4, 8) ||
      checkWinHelper(6, 4, 2)
    )
}

function clearBoard() {
  gameDiv.innerHTML = newBoardElements
  playerOneScore.className = "player-score active-player"
  playerTwoScore.className = "player-score"
}

function homePage() {
  winnerPopup.close()
  allPlayerFetch()
  toggleDiv(gameContainer, "none")
  toggleDiv(playerDiv, "block")
  toggleDiv(gameLogo, "block")
}


/**
* ====================================================
* AJAX CALLS
* ====================================================
*/

function newGameFetch() {
  event.preventDefault();
  let playerOneId = selectPlayerOne[selectPlayerOne.selectedIndex].dataset.playerId
  let playerTwoId = selectPlayerTwo[selectPlayerTwo.selectedIndex].dataset.playerId
  playerOneName.innerHTML = selectPlayerOne[selectPlayerOne.selectedIndex].innerHTML
  playerTwoName.innerHTML = selectPlayerTwo[selectPlayerTwo.selectedIndex].innerHTML
  fetch('http://localhost:3000/api/v1/games', postGameObj(playerOneId, playerTwoId))
   .then(res => res.json())
   .then(gameData => appendGamePage(gameData))
   .catch(errors => console.log(errors.messages))
}

function postGameObj(playerOneId, playerTwoId) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {
        player_one_id: playerOneId,
        player_two_id: playerTwoId,
        winner: null
      }
    )
  }
}

function rematchGameFetch() {
  let playerOneId = playerOneScore.dataset.playerId
  let playerTwoId = playerTwoScore.dataset.playerId
  playerOneName.innerHTML = selectPlayerOne[selectPlayerOne.selectedIndex].innerHTML
  playerTwoName.innerHTML = selectPlayerTwo[selectPlayerTwo.selectedIndex].innerHTML
  fetch('http://localhost:3000/api/v1/games', postGameObj(playerOneId, playerTwoId))
   .then(res => res.json())
   .then(gameData => {
     winnerPopup.close()
     appendGamePage(gameData)})
   .catch(errors => console.log(errors.messages))
}


function updateGameFetch(gameId, winnerId) {
  fetch(`http://localhost:3000/api/v1/games/${gameId}`, patchGameObj(winnerId))
   .then(res => res.json())
   //.then(gameData => ???)   Need to determine if we need to do something here
   .catch(errors => console.log(errors.messages))
}

function patchGameObj(winnerId) {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {
        winner: winnerId
      }
    )
  }
}
