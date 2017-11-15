application.controller('loginController', function($scope, $http, $location) {
  $scope.form = {};
  $scope.loginUser = function() {
    console.log("gfhgfh:"+$scope.form.username);
    var user = $scope.form.username;
    $http.get('/signup_user/'+user)
    .success(function() {
      console.log("success");
    $location.path("/assets");
    })
    .error(function(data) {
      console.log("error");
    $location.path("/login");
    });
  };
});
