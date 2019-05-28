const selectPlayerOne = document.getElementById('select-player-one')
const selectPlayerTwo = document.getElementById('select-player-two')
const startGameForm = document.getElementById('start-game-form')
const submitNewGame = startGameForm.querySelector('input[type="submit"]')
/**
 * ====================================================
 * EVENT LISTENERS
 * ====================================================
 */
startGameForm.addEventListener('change', playerSelectHandler)
selectPlayerOne.addEventListener('change', changePlayerTwoSelectOptions)
selectPlayerTwo.addEventListener('change', changePlayerOneSelectOptions)

/**
 * ====================================================
 * DOM RENDERERS
 * ====================================================
 */

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
    popup.open()
  }
}

function changePlayerTwoSelectOptions() {
  showAllOptions(selectPlayerTwo)
  selectPlayerTwo[selectPlayerOne.selectedIndex].setAttribute('hidden', 'true')
}

function changePlayerOneSelectOptions() {
  showAllOptions(selectPlayerOne)
  selectPlayerOne[selectPlayerTwo.selectedIndex].setAttribute('hidden', 'true')
}

//Helper function for changePlayerOneSelectOptions and changePlayerTwoSelectOptions
function showAllOptions(selectForm) {
  let selectedPlayer = [...selectForm.children]
  selectedPlayer.forEach(option => option.removeAttribute('hidden'))
}
