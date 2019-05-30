

/**
* ====================================================
* EVENT LISTENERS
* ====================================================
*/

hallFameButton.addEventListener("click", showHallFame)
homePageButton2.addEventListener("click", homePage)



/**
* ====================================================
* DOM RENDERERS
* ====================================================
*/

function showHallFame() {
  toggleDiv(playerDiv, "none")
  toggleDiv(hallFameDiv, "block")
}
