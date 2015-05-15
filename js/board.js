'use strict';
/* global TGDGame */
// Create a namespace for game
var TGDGame = TGDGame || {};

TGDGame.Board = (function(w, doc){

  var _board = [],
      _players,
      _numOfPlayers,
      _playerChooser = 0,
      _gameOver = false;

  // True if checkCell value is equal to the str.
  function checkCell(index, str){
    var result = false;
    var cellToCheck = _board[index];

    if(cellToCheck.player === undefined){
      result = false;
    }else{
      result = cellToCheck.player.getContent() === str;
    }
    return result;
  };

  function _isWinner(player){
    var s = player.getContent();
    var match = false;

    match = (
      checkCell(0, s) && checkCell(1, s) && checkCell(2,s) ||
        checkCell(3, s) && checkCell(4, s) && checkCell(5,s) ||
        checkCell(6, s) && checkCell(7, s) && checkCell(8,s) ||
        checkCell(0, s) && checkCell(3, s) && checkCell(6,s) ||
        checkCell(1, s) && checkCell(4, s) && checkCell(7,s) ||
        checkCell(2, s) && checkCell(5, s) && checkCell(8,s)
    );

    return match;
  };

  function _allCells(){
    return doc.getElementsByClassName('box_cell');
  };

  function _allCellsInvoke(operation, cb){
    Array.prototype[operation].call(_allCells(), cb)
  }

  function _reset(){
    var cell;
    // reset internal board
    _board = [];
    _playerChooser = 0;
    _gameOver = false;

    _allCellsInvoke('forEach', function(domElement){
      cell = new TGDGame.Cell(domElement);
      cell.render();
      _board.push(cell);
    });
  };

  function _setPlayers(players){
    // should be an array of players
    _players = players;
    _numOfPlayers = _players.length;
  }

  function _boardClickHandler(event){
    var cellIndex = event.target.dataset.cell,
        cell = _board[cellIndex],
        currentPlayer;

    // Don't select a cell twice
    if(cell.isSelected() || _gameOver){
      return;
    }

    currentPlayer = _players[_playerChooser];
    cell.setPlayer(currentPlayer);
    cell.render();
    _playerChooser = (_playerChooser + 1) % _numOfPlayers;

    // see if we have a winner
    if(_isWinner(currentPlayer)){
      _gameOver = true;
      alert("We have a winner for " + currentPlayer.getName());
    }
  };

  return {
    reset: _reset,
    setPlayers: _setPlayers,
    boardClickHandler: _boardClickHandler
  };
})(window, window.document);
