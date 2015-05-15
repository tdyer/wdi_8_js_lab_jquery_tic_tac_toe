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

  // True if cell in _board[index] matches str.
  function checkCell(index, str){
    // if cell is selected and it's content is equal to str
    return _board[index].isSelected() && _board[index].player.getContent() === str;
  };

  function _isWinner(player){
    var s = player.getContent();
    return (
      checkCell(0, s) && checkCell(1, s) && checkCell(2,s) ||
        checkCell(3, s) && checkCell(4, s) && checkCell(5,s) ||
        checkCell(6, s) && checkCell(7, s) && checkCell(8,s) ||
        checkCell(0, s) && checkCell(3, s) && checkCell(6,s) ||
        checkCell(1, s) && checkCell(4, s) && checkCell(7,s) ||
        checkCell(2, s) && checkCell(5, s) && checkCell(8,s)
    );

  };

  // get all the cells in the game
  function _getAllCells(){
    return doc.getElementsByClassName('box_cell');
  };

  // invoke an Array method, .e.g. forEach, on a non-Array collection.
  // cb is the function passed to the Array method.
  function _allCellsInvoke(operation, cb){
    // getElementsByClassName returns a HTMLCollection which 
    // does NOT have a forEach method.
    // So, lets give this HTMLCollection instance a forEach method.
    var htmlCollection = _getAllCells();
    Array.prototype[operation].call(htmlCollection, cb)
  }

  // reset the game board
  function _reset(){
    var cell;
    // reset internal board
    _board = [];
    _playerChooser = 0;
    _gameOver = false;

    // create 9 Cell instances
    _allCellsInvoke('forEach', function(domElement){
      cell = new TGDGame.Cell(domElement);
      cell.render(); // reset cell to empty string
      _board.push(cell); // Add cell instance to the board
    });
  };

  // add players to this board.
  function _setPlayers(players){
    // should be an array of players
    _players = players;
    _numOfPlayers = _players.length;
  }

  // click handler
  function _boardClickHandler(event){
    // get the index of the clicked cell from the html elements 
    // data attribute,'data-cell'
    var cellIndex = event.target.dataset.cell,
        cell = _board[cellIndex],
        currentPlayer;

    // Don't select a cell twice or add to completed game
    if(cell.isSelected() || _gameOver){
      return;
    }

    // get the current player
    currentPlayer = _players[_playerChooser];
    // add the current player to the clicked cell.
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
