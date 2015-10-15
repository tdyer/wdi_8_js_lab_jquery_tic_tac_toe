'use strict';

$(document).ready(function(){
  $('.box_cell').on('click', function(){
    console.log('click event on ', event.target);
    console.log('click event on ', $(this));
  });;

  $('#add-square').on('click', function(){
    // add a square
    $('#game_board > tr').each(function(rowNum){
      $(this).append('<td class="box_cell" data-cell="'+ ((rowNum*3) + 2) + '" ></td>');
    });
  });
});
