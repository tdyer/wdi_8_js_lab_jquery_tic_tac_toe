$(document).ready(function(){
  resetBoard();
  $('.box_cell').on('click', setCell);
});

var cellTexts = ['X', 'O'];
var index = 0;
var board;
var winningBoardStrs = ['XXX00', '000XXX'];

var setCell = function(event){

  // short circuit, return, if the cell has already been selected
  if(isCellUsed(this)){
    return;
  }
  var cellValue = cellTexts[index];

  // set the cells value, 'X' or 'O'
  this.textContent = cellValue;
  // index will always be either 0 or 1
  index = (index + 1) % 2;

  // set the board, 2D array, element corresponding to the cell selected.
  board[parseInt(this.dataset.row)][parseInt(this.dataset.col)] = cellValue;

  // check if we have a winning combination of X's or O's
  var winner = isWinnerMatch(cellValue === 'X' ? true : false);
  if(winner){
    alert("We have a winner for " + cellValue);
    resetBoard();
  }
  //checkWinner();
};

// function checkWinner(){
//   var flatBoard = flatten(board),
//       boardStr = flatBoard.join('');

//   if( winningBoardStrs.includes(boardStr)){
//     alert("Doneso");
//   }
// };

function flatten(array){
  var flatArray = [];
  array.forEach(function(subArray){
    flatArray = flatArray.concat(subArray);
  });
  return flatArray;
};

function resetBoard(){
  board = [[], [], []];
  var cells = document.getElementsByClassName('box_cell');
  // cells is HTMLCollection, has no forEach method.
  // use the Array.forEach method
  Array.prototype.forEach.call(cells, function(cell){
    cell.textContent = '';
  });

  // reset to use 'X'
  index = 0;
};

// return true if the cell has a value, typically 'X' or 'O'
function isCellUsed(cell){
  return cell.textContent === '' ? false : true;
};

function isWinnerMatch(isX){
  var matchStr = isX ? 'XXX' : 'OOO';
  var match = false;

  if(board[0].join('') == matchStr){
    // match row 1
    match = true;
  }else if(board[1].join('') === matchStr){
    // match row 2
    match = true;
  }else if(board[2].join('') === matchStr){
    // match row 3
    match = true;
  }else if((board[0][0] + board[1][0] + board[2][0]) === matchStr){
    // match column 1
    match = true;
  }else if((board[0][1] + board[1][1] + board[2][1]) === matchStr){
    // match column 2
    match = true;
  }else if((board[0][2] + board[1][2] + board[2][2]) === matchStr){
    // match column 3
    match = true;
  }else if((board[0][0] + board[1][1] + board[2][2]) === matchStr){
    // match diagonal, left to right
    match = true;
  }else if((board[0][2] + board[1][1] + board[2][0]) === matchStr){
    // match diagonal, left to rigth
    match = true;
  }
  return match;
}
