/*
	Created by Rafael Violato <rfviolato@gmail.com> @ pagar.me
*/

'use strict';

(function(){

	angular.module('pg-ng-range', [])
	.directive('pgNgRange', pgNgRange);

	pgNgRange.$inject = ['$document', '$timeout'];

	function pgNgRange($document, $timeout){

		var template = [

			'<div class="pg-range-wrapper">' ,
				'<div class="pg-range">' ,
					'<div class="range-indicator" ng-style="{left: Math.round(rangeCtrl.percentage)+ \'%\'}"></div>' ,
					'<div class="range-bars">' ,
						'<div class="bar" ng-repeat="bar in rangeCtrl.bars"></div>' ,
					'</div>' ,
				'</div>' ,
			'</div>' ,

		].join('');

		var directive = {

			scope:{
				percentage: '@initialPercentage',
			},
			replace: true,
			template: template,
			controller: controller,
			controllerAs: 'rangeCtrl',
			link: postLink,

		};

		function controller($scope){

			var self = this;

			$scope.Math = window.Math;
			self.bars = [];

			for (var i = 99; i >= 0; i--) {
				self.bars.push(i);
			};

			$scope.percentage ? self.percentage = parseInt($scope.percentage) : self.percentage = 0;

		}

		function postLink($scope, $element, attrs, ctrl){

			var holding = false;
			var initialX = 0;
			var initialPerc;
			var percAux;
			var width;

			$timeout(function(){

				var trigger = angular.element($element[0].querySelector('.range-indicator'));
				width = $element.prop('offsetWidth');

				trigger.on('mousedown', mousedown);

				$document.on('mouseup', mouseup);
				$document.on('mousemove', mousemove);

			});

			function mousedown(evt){

				if(!holding){

					holding = true;
					initialX = evt.pageX || evt.clientX;
					initialPerc = ctrl.percentage;

				}

			}

			function mouseup(){

				if(holding){

					holding = false;

				}
				
			}

			function mousemove(evt){
					
				if(holding){
					
					var _x = evt.pageX || evt.clientX;
					var _limit = width; //mouseX limit
					var _val = (_x - initialX) + (_limit * (initialPerc / 100));

					percAux = _val * 100 / _limit;

					$scope.$apply(function(){

						if(percAux < 0){

							ctrl.percentage = 0;

						}else if(percAux > 100){

							ctrl.percentage = 100;

						}else{

							ctrl.percentage = percAux;

						}

					});

				}

			}

		}

		return directive;
		
	}
	
})();