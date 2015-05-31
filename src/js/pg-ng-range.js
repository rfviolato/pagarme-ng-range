/*
	Created by Rafael Violato <rfviolato@gmail.com> @ pagar.me
*/

'use strict';

(function(){

	angular.module('pg-ng-range', [])
	.directive('pgNgRange', pgNgRange);

	function pgNgRange(){

		var template = [

		].join('');

		var directive = {

			scope:{

			},
			// template: template,
			controller: controller,
			link: postLink,

		};

		function controller(){
			console.log('controller up!');
		}

		function postLink(){
			console.log('link function up!');
		}

		return directive;
		
	}
	
})();