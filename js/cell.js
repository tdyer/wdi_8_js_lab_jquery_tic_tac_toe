/* global TGDGame */
// Create a namespace for game
'use strict';

var TGDGame = TGDGame || {};

TGDGame.Cell = (function(){

  var _noPlayerHTML = '';

  function Cell(cellDOMElement){
    this.domEl = cellDOMElement;
    this.player;
  };

  // true if cell has a player, it was selected.
  Cell.prototype.isSelected = function(){
    return (this.player !== undefined);
  };

  // render player's HTML or empty string.
  Cell.prototype.render = function(){
    if(this.isSelected()){
      this.domEl.innerHTML = this.player.render();
    }else {
      this.domEl.innerHTML = _noPlayerHTML; 
    }
    return this;
  };

  Cell.prototype.setPlayer = function(player){
    this.player = player;
  };

  return Cell;
}())
