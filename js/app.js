'use strict';
/* global TGDGame */
var TGDGame = TGDGame || {};

window.onload = function(){
  // reset the game
  TGDGame.Board.reset();

  // Create the players;
  TGDGame.Board.setPlayers([
    new TGDGame.Player('tom', '<img class="box_image" src="./img/gnu.svg">'),
    new TGDGame.Player('joanne', '<img class="box_image" src="./img/linux.svg">')
  ]);

  // set the board onclick event handler
  document.getElementById('game_board').onclick = TGDGame.Board.boardClickHandler;
  // game reset event handler
  document.getElementById('reset-game').onclick = TGDGame.Board.reset;

  // registration handler
  document.getElementById('register').onsubmit = TGDGame.User.create;

};
