application.controller('loginController', function($scope, $http, $location, $rootScope, $window) {
  $scope.form = {};
  $scope.loginUser = function() {
    var user = $scope.form.username;
    $http.get('/signup_user/'+user)
    .success(function(data) {
    if(data && data !== 'empty user') {
      var result = data.filter((x)=>x.Record.holder === user);
      localStorage.setItem("privateData", JSON.stringify(result));
      localStorage.setItem("loggedInUser", user);
    }
    $location.path("/assets");
    })
    .error(function(data) {
    $location.path("/login");
    });
  };
});
