// SPDX-License-Identifier: Apache-2.0
// Angular Controller
application.controller('assetController', function($scope, appFactory, $window){


	$("#success_holder").hide();
	$("#success_create").hide();
	$("#error_holder").hide();
	$("#error_query").hide();

	
	$scope.all_private_tuna = JSON.parse(localStorage.getItem("privateData"));
	$scope.all_tuna = [];
	$scope.queryAllTuna = function(){

		appFactory.queryAllTuna(function(data){
			var tunaArray = [];
			for (var i = 0; i < data.length; i++){
				parseInt(data[i].Key);
				data[i].Record.Key = parseInt(data[i].Key);
				tunaArray.push(data[i].Record);
			}
			tunaArray.sort(function(a, b) {
			    return parseFloat(a.Key) - parseFloat(b.Key);
			});
			$scope.all_tuna = tunaArray;
			var privateTuna = data.filter((x) => x.Record.holder === localStorage.getItem("loggedInUser"));
			localStorage.setItem("privateData", JSON.stringify(privateTuna));
			$scope.all_private_tuna = JSON.parse(localStorage.getItem("privateData"));			
		});
	}

	$scope.queryTuna = function(){

		var id = $scope.tuna_id;

		appFactory.queryTuna(id, function(data){
			$scope.query_tuna = data;

			if ($scope.query_tuna == "Could not locate tuna"){
				$("#error_query").show();
			} else{
				$("#error_query").hide();
			}
		});
	}

	$scope.recordTuna = function(){
		appFactory.recordTuna($scope.tuna, function(data){
			$scope.create_tuna = data;
			$scope.all_tuna.push(data);
			$("#success_create").show();
			$("#id").val('');
			$("#name").val('');
			$("#holder").val('');
			$("#vehicle").val('');
			$("#price").val('');
			$scope.queryAllTuna();
		});
	}

	$scope.changeHolder = function(){

		appFactory.changeHolder($scope.holder, function(data){
			$scope.change_holder = data;
			if ($scope.change_holder == "Error: no tuna catch found or you are not the holder"){
				$("#error_holder").show();
				$("#success_holder").hide();
			} else{
				$("#success_holder").show();
				$("#error_holder").hide();
			}
			$scope.queryAllTuna();
		});
	}

});

// Angular Factory
application.factory('appFactory', function($http){

	var factory = {};

    factory.queryAllTuna = function(callback){

    	$http.get('/get_all_tuna/').success(function(output){
			callback(output)
		});
	}

	factory.queryTuna = function(id, callback){
    	$http.get('/get_tuna/'+id).success(function(output){
			callback(output)
		});
	}

	factory.recordTuna = function(data, callback){

    	
var tuna = data.id + "-" + data.latitude + ", " + data.longitude + "-" + data.timestamp + "-" + data.holder + "-" + data.vessel;
    	$http.get('/add_tuna/'+tuna).success(function(output){
			callback(output)
		});
	}

	factory.changeHolder = function(data, callback){

		var holder = data.id + "-" + data.name;

    	$http.get('/change_holder/'+holder).success(function(output){
			callback(output)
		});
	}

	return factory;
});
