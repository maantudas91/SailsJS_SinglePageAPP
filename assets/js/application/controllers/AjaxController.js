'use strict';
function AjaxController($scope, $routeParams) {
	$scope.userList = {};

	$scope.getUserList = function() {
        $.ajax({
            url: '/user',
            type:'GET',
            success: function(data, textStatus, jqXHR) {
            	$scope.userList = data;
            	$scope.$apply();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });		

    };

	$scope.createNewUser = function() {

		var userName = $('#name').val(),
			userEmail = $('#email').val(),
			userDesc = $('#description').val();

        $.ajax({
        	url:'/user/create?name=' + userName + '&email=' + userEmail + '&profileDescription=' + userDesc,
			type:'POST',        	
        	success: function(data) {
        		$scope.getUserList();
				$scope.$apply();
        	},
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }        	
        });
	};

	$scope.deleteUser = function(userId) {
        $.ajax({
        	url: '/user/destroy/' + userId,
			type: 'DELETE',     	
        	success: function(data) {
        		$scope.getUserList();
				$scope.$apply();
        	},
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }        	
        });		
	};

	// Run On-Load
	$scope.getUserList();

};