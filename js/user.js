var TGDGame = TGDGame || {};

TGDGame.User = (function(){
  // current user
  var _id, _email;

  // create a user
  var _create = function(event){
    var email = event.target.children.email.value,
        pw = event.target.children.password.value,
        pw_confirm = event.target.children.password_confirmation.value,
        credentials;

    // TODO: add email, password validation
    credentials = {
      credentials: {
        email: email,
        password: pw,
        password_confirmation: pw_confirm
      }
    };

    event.preventDefault();

    $.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: TGDGame.Util.url + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    })
      .done(function(remoteData, status){
        console.log('status', status);
        console.log('remoteData', remoteData);
        // save the user id
        _id = remoteData.user.id;
        _email = remoteData.user.email;
        $('#msg').html("Registered " + _email + " with id " + _id);
      })
      .fail(function(jqxhr, status, error){
        console.error('Error', status);
      });
  };

  // get for current user
  var _getUserID = function(){
    return _id;
  };

  return {
    create: _create,
    userID: _getUserID
  };

})();
