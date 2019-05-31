const selectPlayerOne = document.getElementById('select-player-one')
const selectPlayerTwo = document.getElementById('select-player-two')
const startGameForm = document.getElementById('start-game-form')
const submitNewGame = startGameForm.querySelector('input[type="submit"]')
const addPlayerForm = document.getElementById("add-player-form")
const newPlayerName = document.getElementById("new-player-name")
const scoreBoard = document.getElementById("scoreboard")
const newPlayerClose = document.getElementById("player-close-button")
const playerOneScore = document.getElementById("player-one-score")
const playerTwoScore = document.getElementById("player-two-score")
const gameDiv = document.getElementById("game-div")
const gameContainer = document.getElementById("game-container")
const playerDiv = document.getElementById("player-div")
const winnerName = document.getElementById("winner-name")
const winDiv = document.getElementById("win-div")
const playerOneName = document.getElementById("player-one-card-name")
const playerTwoName = document.getElementById("player-two-card-name")
const rematchButton = document.getElementById("rematch-button")
const homePageButton = document.getElementById("home-page")
const homePageButton2 = document.getElementById("home-page-2")
const gameLogo = document.getElementById("game-logo")
const hallFameDiv = document.getElementById("hall-fame-container")
const hallFameButton = document.getElementById("show-hall-fame-button")
const gamesWon = document.getElementById("games-won")
const fireWorks = document.getElementById("fireworks")
const gamesPlayed = document.getElementById("games-played")
const winnerStats = document.getElementById("winner-stats")
const popup = new Foundation.Reveal($('#add-new-player-modal'))
const winnerPopup = new Foundation.Reveal($('#winner-rematch-modal'))
let playerOne = 0;
let playerTwo = 0;

/**
 * ====================================================
 * EVENT LISTENERS
 * ====================================================
 */
startGameForm.addEventListener('change', playerSelectHandler)
selectPlayerOne.addEventListener('change', changePlayerTwoSelectOptions)
selectPlayerTwo.addEventListener('change', changePlayerOneSelectOptions)
addPlayerForm.addEventListener('submit', newPlayerFetch)
newPlayerClose.addEventListener('click', resetSelectValue)


/**
 * ====================================================
 * DOM RENDERERS
 * ====================================================
 */

function resetSelectValue() {
  let playerSelect = document.getElementById(addPlayerForm.dataset.playerSelectId)
  playerSelect[0].selected = "true"
  submitNewGame.style.display = "none"
}

function appendPlayerSelectOptions(playersData) {
  let optionString = `<option selected='true' disabled>Select a Player</option>`
  playersData.forEach(player => optionString += createPlayerSelectOption(player))
  optionString += `<option data-name='new-player'>Add New Player</option>`
  selectPlayerOne.innerHTML = optionString;
  selectPlayerTwo.innerHTML = optionString;
  if (playerOne) {
    selectPlayerOne[playerOne].selected = "true"
  }
  if (playerTwo) {
    selectPlayerTwo[playerTwo].selected = "true"
  }
}

function createPlayerSelectOption(player) {
  return `<option data-player-id="${player.id}" value="${player.name}">${player.name}</option>`
}

function playerSelectHandler () {
  addNewPlayerHandler()
  toggleNewGameSubmitButton()
}

function toggleNewGameSubmitButton() {
  let validPlayerOne = selectPlayerOne.selectedIndex !== 0
  let validPlayerTwo = selectPlayerTwo.selectedIndex !== 0
  validPlayerOne && validPlayerTwo
    ? submitNewGame.style.display = "block"
    : submitNewGame.style.display = "none"
}

function addNewPlayerHandler() {
  if (event.target.selectedOptions[0].dataset.name === 'new-player') {
    addPlayerForm.setAttribute("data-player-select-id", event.target.id)
    popup.open()
  }
}

function changePlayerTwoSelectOptions() {
  playerOne = selectPlayerOne.selectedIndex
  showAllOptions(selectPlayerTwo)
  selectPlayerTwo[selectPlayerOne.selectedIndex].setAttribute('hidden', 'true')
  selectPlayerTwo.lastElementChild.removeAttribute('hidden')
}

function changePlayerOneSelectOptions() {
  playerTwo = selectPlayerTwo.selectedIndex
  showAllOptions(selectPlayerOne)
  selectPlayerOne[selectPlayerTwo.selectedIndex].setAttribute('hidden', 'true')
  selectPlayerOne.lastElementChild.removeAttribute('hidden')
}

//Helper function for changePlayerOneSelectOptions and changePlayerTwoSelectOptions
function showAllOptions(selectForm) {
  let selectedPlayer = [...selectForm.children]
  selectedPlayer.forEach(option => option.removeAttribute('hidden'))
}

/**
 * ====================================================
 * AJAX CALLS
 * ====================================================
 */

 function allPlayerFetch(){
   fetch('http://localhost:3000/api/v1/players')
    .then(res => res.json())
    .then(playersData => {
      appendPlayerSelectOptions(playersData)
      changePlayerOneSelectOptions()
      changePlayerTwoSelectOptions()
    })
    .catch(errors => console.log(errors.messages))
 }

 function newPlayerFetch() {
   event.preventDefault();
   fetch('http://localhost:3000/api/v1/players', postPlayerObj(newPlayerName.value))
    .then(res => res.json())
    .then(player => allPlayerFetch())
    .catch(errors => console.log(errors.messages))
    popup.close();
 }

 function postPlayerObj(name) {
   return {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
     },
     body: JSON.stringify(
       {
         name: name
       }
     )
   }
 }


 /**
  * ====================================================
  * INVOKED FUNCTIOND
  * ====================================================
  */

  allPlayerFetch();
