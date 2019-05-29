



/**
 * ====================================================
 * EVENT LISTENERS
 * ====================================================
 */

 startGameForm.addEventListener("submit", newGameFetch)



 /**
  * ====================================================
  * DOM RENDERERS
  * ====================================================
  */


  function appendGamePage(gameData) {
    toggleDiv(playerDiv, "none")
    toggleDiv(gameDiv, "block")
  }

  function toggleDiv(div, display) {
    div.style.display  = display
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
