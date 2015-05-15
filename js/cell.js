var Game.Cell = (function(w, doc){
  function Cell(cellDOMElement){
    this.domEl = cellDOMElement;
    this.row = w.parseInt(this.domEl.target.dataset.row);
    this.column = w.parseInt(this.domEl.target.dataset.row);
  }

  Cell.prototype.resetContents = function(){
    this.domEl.textContent = '';
  };

  Cell.prototype.isSelected = function(){
    return this.domEl.textContent === '' ? false : true;
  };

  return Cell;
}(window, document))