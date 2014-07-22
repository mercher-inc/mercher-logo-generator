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

    function Line(A, B, C) {
      this.A = A;
      this.B = B;
      this.C = C;

      this.x1 = function() {
        if (!this.A) {
          if (this.B > 0) {
            return 0;
          } else {
            return $scope.size;
          }
        } else if (!this.B) {
          return - (this.B * this.y1() + this.C) / this.A;
        } else {

        }
      };

      this.y1 = function() {
        if (!this.A) {
          return - (this.A * this.x1() + this.C) / this.B;
        } else if (!this.B) {
          if (this.A > 0) {
            return 0;
          } else {
            return $scope.size;
          }
        } else {

        }
      };

      this.x2 = function() {
        if (!this.A) {
          if (this.B > 0) {
            return $scope.size;
          } else {
            return 0;
          }
        } else if (!this.B) {
          return - (this.B * this.y2() + this.C) / this.A;
        } else {

        }
      };

      this.y2 = function() {
        if (!this.A) {
          return - (this.A * this.x2() + this.C) / this.B;
        } else if (!this.B) {
          if (this.A > 0) {
            return $scope.size;
          } else {
            return 0;
          }
        } else {

        }
      };
    }

    var
      leftLine = new Line(1, 0, 0),
      left2Line = new Line(-1, 0, $scope.lineWidth),
      left3Line = new Line(-1, 0, $scope.lineWidth + $scope.linePadding),
      left4Line = new Line(-1, 0, $scope.lineWidth * 2 + $scope.linePadding),
      left5Line = new Line(-1, 0, $scope.lineWidth * 2 + $scope.linePadding * 2),
      rightLine = new Line(-1, 0, $scope.size),
      right2Line = new Line(-1, 0, $scope.size - $scope.lineWidth),
      right3Line = new Line(-1, 0, $scope.size - $scope.lineWidth - $scope.linePadding),
      right4Line = new Line(-1, 0, $scope.size - $scope.lineWidth * 2 - $scope.linePadding),
      right5Line = new Line(-1, 0, $scope.size - $scope.lineWidth * 2 - $scope.linePadding * 2),
      topLine = new Line(0, 1, 0),
      bottomLine = new Line(0, -1, $scope.size);

    $scope.lines = [
      leftLine,
      left2Line,
      left3Line,
      left4Line,
      left5Line,
      rightLine,
      right2Line,
      right3Line,
      right4Line,
      right5Line,
      topLine,
      bottomLine
    ];

    $scope.calculateLines = function () {
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

