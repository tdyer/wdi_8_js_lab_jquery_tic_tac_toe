'use strict';

var tttapi = (function(){

  var gameWatcher = null,
      _url = 'http://ttt.wdibos.com',
      _token;

  var _register = function(credentials, successHandler, errorHandler){
    $.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: _url + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    })
      .done(successHandler)
      .fail(errorHandler);
  };

  var _login = function(credentials, successHandler, errorHandler){
    $.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: _url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    })
      .done(successHandler)
      .fail(errorHandler);
  };

  var _listGames = function(successHandler, errorHandler){
    $.ajax({
      method: 'GET',
      url: _url + '/games',
      headers: {
        Authorization: 'Token token=' + _token
      },
      dataType: 'json'
    })
      .done(successHandler)
      .fail(errorHandler);
  };

  return {
    register: _register,
    login: _login,
    listGames: _listGames
  };

})();
