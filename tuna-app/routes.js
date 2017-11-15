//SPDX-License-Identifier: Apache-2.0

var tuna = require('./controller.js');


module.exports = function(app){

  app.get('/get_tuna/:id', function(req, res){
    tuna.get_tuna(req, res)
  });
  app.get('/signup_user/:user', function(req, res){
    tuna.signup_user(req, res)
    .then(function() {
      console.log("route succes");
      // console.log(res.redirect('/assets'));
      res.send('success');

    })
    .catch(function (err) {
      console.log("route errore");
      res.send(err)
    });
  });
  app.get('/sign_user/:user', function(req, res){
    tuna.sign_user(req, res)
    .then(function() {res.redirect('/assets')})
    .catch(function (err) {res.redirect('/login')});
  });
  app.get('/add_tuna/:tuna', function(req, res){
    tuna.add_tuna(req, res);
  });
  app.get('/get_all_tuna', function(req, res){
    tuna.get_all_tuna(req, res);
  });
  app.get('/change_holder/:holder', function(req, res){
    tuna.change_holder(req, res);
  });
}
