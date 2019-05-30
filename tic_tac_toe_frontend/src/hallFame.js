
const firstPlace = document.getElementById("first-place")
const secondPlace = document.getElementById("second-place")
const thirdPlace = document.getElementById("third-place")
/**
* ====================================================
* EVENT LISTENERS
* ====================================================
*/

hallFameButton.addEventListener("click", fetchHallFame)
homePageButton2.addEventListener("click", homePage)



/**
* ====================================================
* DOM RENDERERS
* ====================================================
*/


function showHallFame(data) {
  renderPlayerData(firstPlace, data[0])
  renderPlayerData(secondPlace, data[1])
  renderPlayerData(thirdPlace, data[2])
  toggleDiv(playerDiv, "none")
  toggleDiv(hallFameDiv, "block")
}

function renderPlayerData(position, playersData) {
  position.children[1].textContent = playersData.name
  position.children[2].textContent = playersData.games_played
  position.children[3].textContent = playersData.games_won
}



function fetchHallFame() {
  fetch("http://localhost:3000/api/v1/winner")
  .then( res => res.json() )
  .then( data => showHallFame(data))
  .catch( errors => console.log(errors.messages) )
}
