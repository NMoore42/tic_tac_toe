




/**
* ====================================================
* EVENT LISTENERS
* ====================================================
*/

startGameForm.addEventListener("submit", newGameFetch)
gameDiv.addEventListener("mouseover", mouseOverSymbol)
gameDiv.addEventListener("mouseout", mouseOutClear)
gameDiv.addEventListener("click", submitTurn)



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
  }
}

function winHandler() {
  !checkWin() ? switchPlayers() : endGame()
}

function endGame() {
  let winnerId = document.querySelector(".active-player").dataset.playerId
  let gameId = gameDiv.dataset.gameId
  updateGameFetch(gameId, winnerId)
  //enter screen change here
}

function appendGamePage(gameData) {
  gameDiv.dataset.gameId = gameData.id
  playerOneScore.dataset.playerId = gameData.player_one_id
  playerTwoScore.dataset.playerId = gameData.player_two_id
  toggleDiv(playerDiv, "none")
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

function updateGameFetch(gameId, winnerId) {
  fetch(`http://localhost:3000/api/v1/games/${gameId}`, patchGameObj(winnerId))
   .then(res => res.json())
   //.then(gameData => ???)
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
