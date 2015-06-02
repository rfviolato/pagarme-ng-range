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
					'<div class="range-indicator" data-ng-style="{left: Math.round(rangeCtrl.percentage)+ \'%\'}"></div>' ,
					'<div class="range-bars">' ,
						'<div class="bar" data-ng-repeat="bar in ::rangeCtrl.bars">' ,
						'</div>' ,
					'</div>' ,
				'</div>' ,
			'</div>' ,

		].join('');

		var directive = {

			scope:{
				percentage: '@value',
				min: '=',
				max: '=',
			},
			template: template,
			controller: controller,
			link: postLink,
			controllerAs: 'rangeCtrl',
			bindToController: true,
			replace: true,

		};

		return directive;

		function controller($scope){

			var self = this;

			$scope.Math = window.Math;
			self.bars = [];
			self.dragging = false;

			self.min ? true : self.min = 0;
			self.max ? true : self.max = 100;
			self.percentage ? true : self.percentage = 50;

			for (var i = 99; i >= 0; i--) {

				self.bars.push(i);

			};

		}

		function postLink($scope, $element, attrs, ctrl){

			var initialX;
			var initialPerc;
			var bars;
			var percAux;
			var width;

			$timeout(function(){

				var trigger = angular.element($element[0].querySelector('.range-indicator'));
				bars = angular.element($element[0].querySelectorAll('.bar'));
				width = $element.prop('offsetWidth');

				trigger.on('mousedown', mousedown);
				$document.on('mouseup', mouseup);
				$document.on('mousemove', mousemove);

				paintBars(ctrl.percentage);

			});

			function mousedown(evt){

				if(!ctrl.dragging){

					ctrl.dragging = true;
					initialX = evt.pageX || evt.clientX;
					initialPerc = ctrl.percentage;
					$element.addClass('dragging');

				}

			}

			function mouseup(){

				if(ctrl.dragging){

					ctrl.dragging = false;
					$element.removeClass('dragging');

				}
				
			}

			function mousemove(evt){
					
				if(ctrl.dragging){
					
					var _x = evt.pageX || evt.clientX;
					var _limit = width;
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

						paintBars(ctrl.percentage);

					});

				}

			}

			function paintBars(amount){

				for (var i = 0; i <= bars.length - 1; i++) {
					
					if(i <= amount){

						bars.eq(i).addClass('colorized');

					}else{

						bars.eq(i).removeClass('colorized');

					}

				}
				
			}

		}
		
	}
	
})();