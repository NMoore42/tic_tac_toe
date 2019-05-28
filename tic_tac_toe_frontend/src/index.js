const selectPlayerOne = document.getElementById('select-player-one')
const selectPlayerTwo = document.getElementById('select-player-two')
const startGameForm = document.getElementById('start-game-form')
const submitNewGame = startGameForm.querySelector('input[type="submit"]')
/**
 * ====================================================
 * EVENT LISTENERS
 * ====================================================
 */
startGameForm.addEventListener('change', toggleNewGameSubmitButton)
startGameForm.addEventListener('change', toggleOptionPlayerSelect)

/**
 * ====================================================
 * DOM RENDERERS
 * ====================================================
 */
function toggleNewGameSubmitButton () {
  let validPlayerOne = selectPlayerOne.selectedIndex !== 0
  let validPlayerTwo = selectPlayerTwo.selectedIndex !== 0
  validPlayerOne && validPlayerTwo ? submitNewGame.removeAttribute('hidden') : submitNewGame.setAttribute('hidden', 'true')
}

function toggleOptionPlayerSelect () {
  // selectPlayerOne.selectedIndex === selectPlayerTwo.selectedIndex
  // let index = selectPlayerOne.selectedIndex || selectPlayerTwo.selectedIndex
  // if (index) {

  // }

  // let selectedPlayerOne = selectPlayerOne[selectPlayerOne.selectedIndex]
  // selectedPlayerOne.setAttribute('hidden', 'true')
}
