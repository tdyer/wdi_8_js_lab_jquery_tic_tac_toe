'use strict';
/* global TGDGame */
var TGDGame = TGDGame || {};

window.onload = function(){
  // reset the game
  TGDGame.Board.reset();

  // Create the players;
  TGDGame.Board.setPlayers([
      new TGDGame.Player('tom', 'X'),
      new TGDGame.Player('joanne', 'O')
      ]);

  // set the board onclick event handler
  document.getElementById('game_board').onclick = TGDGame.Board.boardClickHandler;

  // game reset event handler
  document.getElementById('reset-game').onclick = TGDGame.Board.reset;
};
