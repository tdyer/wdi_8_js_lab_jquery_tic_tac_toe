(function(w, doc){

  // Represents board with 2D array of cells 
  var _board = [[],[],[]],
  _cellValues = ['X', '0'],
  _cellIndex = 0,
  _boardDOMElement;

  function _cellSelected(cell){
    return cell.textContent === '' ? false : true;
  };

  function _isWinner(isXPlayer){
    var matchStr = isXPlayer ? 'XXX' : 'OOO';
    var match = false;

    if(_board[0].join('') == matchStr){
      // match row 1
      match = true;
    }else if(_board[1].join('') === matchStr){
      // match row 2
      match = true;
    }else if(_board[2].join('') === matchStr){
      // match row 3
      match = true;
    }else if((_board[0][0] + _board[1][0] + _board[2][0]) === matchStr){
      // match column 1
      match = true;
    }else if((_board[0][1] + _board[1][1] + _board[2][1]) === matchStr){
      // match column 2
      match = true;
    }else if((_board[0][2] + _board[1][2] + _board[2][2]) === matchStr){
      // match column 3
      match = true;
    }else if((_board[0][0] + _board[1][1] + _board[2][2]) === matchStr){
      // match diagonal, left to right
      match = true;
    }else if((_board[0][2] + _board[1][1] + _board[2][0]) === matchStr){
      // match diagonal, left to rigth
      match = true;
    }
    return match;
  };

  function _allCells(){
    return doc.getElementsByClassName('box_cell');
  };

  function _allCellsInvoke(operation, cb){
    Array.prototype[operation].call(_allCells, cb)
  }

  function _resetBoard(){
    _board = [[], [], []];
    _allCellsInvoke('forEach', function(cell){
      cell.textContent = '';
    })

    // reset to use 'X'
    index = 0;
  };

  function _boardClickHandler(event){
    var target = event.target
    // short circuit if cell has been selected
    if(_cellSelected(target)){
      return;
    }

    // get either 'X' or '0'
    var currentCellValue = _cellValues[_cellIndex],
      // get the row number, (0, 1 or 2), from the selected cell
      row = w.parseInt(target.dataset.row),
      // get the column number, (0, 1 or 2), from the selected cell
      column = w.parseInt(target.dataset.col),
      // is this the X player
      isX = true;

    // set the clicked DOM element textContent, 'X' or 'O'
    target.textContent = currentCellValue;

    // index will always be either 0 or 1
    _cellIndex = (_cellIndex + 1) % 2;

    // set the element in the board 2D array to 'X' or 'O'
    _board[row][column] = currentCellValue;

    // true if X player
    isX = (currentCellValue === 'X') ? true : false;

    // see if we have a winner
    if(_isWinner(isX)){
      alert("We have a winner for " + currentCellValue);
      _resetBoard();
    }
  };

  w.onload = function(){
    _resetBoard();
    doc.getElementById('game_board').onclick = _boardClickHandler;
  };

})(window, window.document);