//Model, i could be a JSON object -¿averiguar si se puede pasar también un JSON ^diferencias^

var model = {
	user: "Dave",
	items: [{ "action": "Buy Flowers", "done": false },
	{ "action": "Get Shoes", "done": false },
	{ "action": "Collect Tickets", "done": true },
	{ "action": "Call Joe", "done": false }]
};

var todoApp = angular.module("todoApp", ['ngMaterial']);  // You will use MVC Patter, so you have to add the Module and the depenpendecies
// If you don't have dependecies yet, you must put an empty array

/*todoApp.run(function ($http) {
	$http.get('todo.json').success(function (data) {
		model.items = data;
		console.log( model.items );
	});
});*/ 

todoApp.filter("checkedItems", function () {
	return function (items, showComplete) {
		var resultArr = [];
		angular.forEach(items, function (item) {
			if (item.done == false || showComplete == true) {
				resultArr.push(item);
			}
		});
		return resultArr;
	}
});



//Controller:
todoApp.controller("ToDoCtrl", function ($scope) { 
//$scope is a built-in feature specially to be used when you want to show up one portion of the model (e.g. the data)
    
    $scope.imagePath = 'src/img/banner.png';
    $scope.imageBack = 'src/img/desk-vintage.jpg';
    $scope.data = {};
    $scope.data.cb1 = true;
    
    $scope.todo = model;

	$scope.incompleteCount = function () {
		var count = 0;
		angular.forEach($scope.todo.items, function (item) {
			if (!item.done) { count++ }
		});
		return count;
	}

	$scope.warningLevel = function () {
		return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
	}

	$scope.warningLevelIco = function () {
		return $scope.incompleteCount() < 3 ? "material-icons green600" : "material-icons orange600";
	}

	$scope.addNewItem = function(actionText){
		$scope.todo.items.push({action: actionText, done: false})
	}

});

todoApp.controller("HeadCtrl", function($scope){
	$scope.titulo = model.user;
});