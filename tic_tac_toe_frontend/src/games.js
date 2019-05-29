let activePlayerSymbol = "url('src/img/x.svg')"



/**
 * ====================================================
 * EVENT LISTENERS
 * ====================================================
 */

 startGameForm.addEventListener("submit", newGameFetch)
 gameDiv.addEventListener("mouseover", mouseOverSymbol)
 gameDiv.addEventListener("mouseout", mouseOutClear)



 /**
  * ====================================================
  * DOM RENDERERS
  * ====================================================
  */

  //Returns X or O .svg based on active player
  function playerSymbol() {
    // if (player1.classList == "players active"){
    //   return "url('src/img/x.svg')"
    // } else if (player2.classList == "players active"){
    //   return "url('src/img/o.svg')"
    // }
  }

  function appendGamePage(gameData) {
    toggleDiv(playerDiv, "none")
    toggleDiv(gameDiv, "block")
  }

  function toggleDiv(div, display) {
    div.style.display  = display
  }

  function mouseOverSymbol() {
    mouseOver = event.target
    if (mouseOver.tagName === "LI") {
      mouseOver.style.backgroundImage = playerSymbol()
    }
  }

  function mouseOutClear() {
    mouseOut = event.target
    if (mouseOut.tagName === "LI") {
      mouseOut.style.backgroundImage = ""
    }
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
