'use strict';

/**
 * @ngdoc function
 * @name mercherLogoGeneratorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mercherLogoGeneratorApp
 */
angular.module('mercherLogoGeneratorApp')
  .controller('MainCtrl', function ($scope) {
    $scope.size = 512;
    $scope.angle = 50;
    $scope.lineWidth = 64;
    $scope.linePadding = 8;

    $scope.color1 = '#1E8A8E';
    $scope.color2 = '#C5C5C5';

    $scope.showLines = true;

    var createLine = function() {
      return [
        {x: 0, y: 0},
        {x: 0, y: 0}
      ];
    };

    $scope.lines = [
      createLine(), //left
      createLine(), //right
      createLine(), //left center
      createLine(), //right center
      createLine(),
      createLine(),
      createLine(),
      createLine()
    ];

    $scope.calculateLines = function(){
      var left1 = $scope.lines[0],
        left2 = $scope.lines[1],
        left3 = $scope.lines[2],
        left4 = $scope.lines[3],
        right1 = $scope.lines[4],
        right2 = $scope.lines[5],
        right3 = $scope.lines[6],
        right4 = $scope.lines[7];

      left1[0].x = 0;
      left1[0].y = 0;
      left1[1].x = 0;
      left1[1].y = $scope.size;

      left2[0].x = $scope.lineWidth;
      left2[0].y = 0;
      left2[1].x = $scope.lineWidth;
      left2[1].y = $scope.size;

      left3[0].x = $scope.lineWidth + $scope.linePadding;
      left3[0].y = 0;
      left3[1].x = $scope.lineWidth + $scope.linePadding;
      left3[1].y = $scope.size;

      left4[0].x = $scope.lineWidth * 2 + $scope.linePadding;
      left4[0].y = 0;
      left4[1].x = $scope.lineWidth * 2 + $scope.linePadding;
      left4[1].y = $scope.size;

      right1[0].x = $scope.size;
      right1[0].y = 0;
      right1[1].x = $scope.size;
      right1[1].y = $scope.size;

      right2[0].x = $scope.size - $scope.lineWidth;
      right2[0].y = 0;
      right2[1].x = $scope.size - $scope.lineWidth;
      right2[1].y = $scope.size;

      right3[0].x = $scope.size - $scope.lineWidth - $scope.linePadding;
      right3[0].y = 0;
      right3[1].x = $scope.size - $scope.lineWidth - $scope.linePadding;
      right3[1].y = $scope.size;

      right4[0].x = $scope.size - $scope.lineWidth * 2 - $scope.linePadding;
      right4[0].y = 0;
      right4[1].x = $scope.size - $scope.lineWidth * 2 - $scope.linePadding;
      right4[1].y = $scope.size;
    };

    $scope.$watch('size', function () {
      $scope.calculateLines();
    });

    $scope.$watch('angle', function () {
      $scope.calculateLines();
    });

    $scope.$watch('lineWidth', function () {
      $scope.calculateLines();
    });

    $scope.$watch('linePadding', function () {
      $scope.calculateLines();
    });

  });

