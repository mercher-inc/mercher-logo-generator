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
    $scope.base = {
      size: 512,
      angle: 50,
      width: 64,
      padding: 8
    };

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
            return $scope.base.size;
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
            return $scope.base.size;
          }
        } else {

        }
      };

      this.x2 = function() {
        if (!this.A) {
          if (this.B > 0) {
            return $scope.base.size;
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
            return $scope.base.size;
          } else {
            return 0;
          }
        } else {

        }
      };
    }

    var
      leftLine = new Line(1, 0, 0),
      left2Line = new Line(-1, 0, $scope.base.width),
      left3Line = new Line(-1, 0, $scope.base.width + $scope.base.padding),
      left4Line = new Line(-1, 0, $scope.base.width * 2 + $scope.base.padding),
      left5Line = new Line(-1, 0, $scope.base.width * 2 + $scope.base.padding * 2),
      rightLine = new Line(-1, 0, $scope.base.size),
      right2Line = new Line(-1, 0, $scope.base.size - $scope.base.width),
      right3Line = new Line(-1, 0, $scope.base.size - $scope.base.width - $scope.base.padding),
      right4Line = new Line(-1, 0, $scope.base.size - $scope.base.width * 2 - $scope.base.padding),
      right5Line = new Line(-1, 0, $scope.base.size - $scope.base.width * 2 - $scope.base.padding * 2),
      topLine = new Line(0, 1, 0),
      bottomLine = new Line(0, -1, $scope.base.size);

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

    $scope.$watchCollection('base', function () {
      console.log($scope.base);
      left2Line.C = $scope.base.width;
      left3Line.C = $scope.base.width + $scope.base.padding;
      left4Line.C = $scope.base.width * 2 + $scope.base.padding;
      left5Line.C = $scope.base.width * 2 + $scope.base.padding * 2;
      rightLine.C = $scope.base.size;
      right2Line.C = $scope.base.size - $scope.base.width;
      right3Line.C = $scope.base.size - $scope.base.width - $scope.base.padding;
      right4Line.C = $scope.base.size - $scope.base.width * 2 - $scope.base.padding;
      right5Line.C = $scope.base.size - $scope.base.width * 2 - $scope.base.padding * 2;
      bottomLine.C = $scope.base.size;
    });

  });

