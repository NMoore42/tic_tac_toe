const selectPlayerOne = document.getElementById('select-player-one')
const selectPlayerTwo = document.getElementById('select-player-two')
const startGameForm = document.getElementById('start-game-form')
const submitNewGame = startGameForm.querySelector('input[type="submit"]')
const addPlayerForm = document.getElementById("add-player-form")
const newPlayerName = document.getElementById("new-player-name")
const newPlayerClose = document.getElementById("player-close-button")
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
}

function appendPlayerSelectOptions(playersData) {
  let optionString = `<option selected='true' disabled>Select a Player</option>`
  playersData.forEach(player => optionString += createPlayerSelectOption(player))
  optionString += `<option data-name='new-player'>Add New Player</option>`
  selectPlayerOne.innerHTML = optionString;
  selectPlayerTwo.innerHTML = optionString;
}

function createPlayerSelectOption(player) {
  return `<option value="${player.name}">${player.name}</option>`
}

function playerSelectHandler () {
  addNewPlayerHandler()
  toggleNewGameSubmitButton()
}

function toggleNewGameSubmitButton() {
  let validPlayerOne = selectPlayerOne.selectedIndex !== 0
  let validPlayerTwo = selectPlayerTwo.selectedIndex !== 0
  validPlayerOne && validPlayerTwo
    ? submitNewGame.removeAttribute('hidden')
    : submitNewGame.setAttribute('hidden', 'true')
}

function addNewPlayerHandler() {
  if (event.target.selectedOptions[0].dataset.name === 'new-player') {
    let popup = new Foundation.Reveal($('#add-new-player-modal'))
    addPlayerForm.setAttribute("data-player-select-id", event.target.id)
    popup.open()
  }
}

function changePlayerTwoSelectOptions() {
  showAllOptions(selectPlayerTwo)
  selectPlayerTwo[selectPlayerOne.selectedIndex].setAttribute('hidden', 'true')
  selectPlayerTwo.lastElementChild.removeAttribute('hidden')
}

function changePlayerOneSelectOptions() {
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
    .then(playersData => appendPlayerSelectOptions(playersData))
    .catch(errors => console.log(errors.messages))
 }

 function newPlayerFetch() {
   fetch('http://localhost:3000/api/v1/players', postPlayerObj(newPlayerName.value))
    .then(res => res.json())
    //.then(player => )  UPDATE THIS TO SET PLAYER SELECT TO NEWLY CREATED PLAYER NAME
    .catch(errors => console.log(errors.messages))
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
