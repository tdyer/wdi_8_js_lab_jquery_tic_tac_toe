var TGDGame = TGDGame || {};

TGDGame.Player = (function(){
  function Player(name, content){
    this.name = name;
    this.content = content;
  };

  Player.prototype.render = function(){
    return this.content;
  };

  Player.prototype.getName = function(){
    return this.name;
  };

  Player.prototype.getContent = function(){
    return this.content;
  };

  return Player;
})();
