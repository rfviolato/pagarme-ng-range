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
					'<div class="range-indicator" ng-style="{left: rangeCtrl.percentage+ \'%\'}"></div>' ,
					'<div class="range-bars">' ,
						'<div class="bar" ng-repeat="bar in rangeCtrl.bars"></div>' ,
					'</div>' ,
				'</div>' ,
			'</div>' ,

		].join('');

		var directive = {

			scope:{
				percentage: '@initialPercentage'
			},
			replace: true,
			template: template,
			controller: controller,
			controllerAs: 'rangeCtrl',
			link: postLink,

		};

		function controller($scope){

			var self = this;

			self.bars = [];

			for (var i = 99; i >= 0; i--) {
				self.bars.push(i);
			};

			$scope.percentage ? self.percentage = parseInt($scope.percentage) : self.percentage = 0;

		}

		function postLink($scope, $element, attrs, ctrl){

			var holding = false;
			var initialX = 0;

			$timeout(function(){

				var trigger = $element.find('.range-indicator');

				trigger.on('mousedown', function(evt){

					if(!holding){

						holding = true;
						initialX = evt.pageX || evt.clientX;

					}

				});

				$document.on('mouseup', function(){

					if(holding){
						holding = false;
						// ctrl.valueChosen();
						// ctrl.dragEnd();
					}

				});

				$document.on('mousemove', function(evt){
					
					if(holding){
						
						var _x = evt.pageX || evt.clientX;
						var _limit = 600; //mouseX limit
						var _val = (_x - initialX) + (_limit * percentage);
						var percentage = _val * 100 / _limit;

						if(percentage < 0){

							percentage = 0;

						}else if(percentage > 100){

							percentage = 100;

						}

						$scope.$apply(function(){
							// $scope.setAmount(_percentage);
						});

					}

				});

			});



		}

		return directive;
		
	}
	
})();