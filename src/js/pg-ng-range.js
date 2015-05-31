/*
	Created by Rafael Violato <rfviolato@gmail.com> @ pagar.me
*/

'use strict';

(function(){

	angular.module('pg-ng-range', [])
	.directive('pgNgRange', pgNgRange);

	function pgNgRange(){

		var template = [
			'<div class="pg-range-wrapper">' ,
				'<div class="pg-range">' ,
					'<div class="range-indicator" ng-style="{left: rangeCtrl.indicatorPosition()+ \'%\'}"></div>' ,
					'<div class="range-bars">' ,
						'<div class="bar" ng-class="{\'green\': rangeCtrl.percentage >= $index}" ng-repeat="bar in rangeCtrl.bars"></div>' ,
					'</div>' ,
				'</div>' ,
			'</div>' ,
		].join('');

		var directive = {

			scope:{

			},
			replace: true,
			template: template,
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