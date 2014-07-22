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
          return - (this.C / this.A);
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
          return 0;
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
          return (this.B * $scope.base.size - this.C) / this.A;
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
          return $scope.base.size;
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
      bottomLine = new Line(0, -1, $scope.base.size),
      topLeftLine = new Line(Math.cos(Math.PI/180 * $scope.base.angle), Math.sin(Math.PI/180 * $scope.base.angle), 0),
      topLeft2Line = new Line(Math.cos(Math.PI/180 * $scope.base.angle), Math.sin(Math.PI/180 * $scope.base.angle), $scope.base.width),
      topLeft3Line = new Line(Math.cos(Math.PI/180 * $scope.base.angle), Math.sin(Math.PI/180 * $scope.base.angle), $scope.base.width + $scope.base.padding),
      topLeft4Line = new Line(Math.cos(Math.PI/180 * $scope.base.angle), Math.sin(Math.PI/180 * $scope.base.angle), $scope.base.width * 2 + $scope.base.padding),
      topLeft5Line = new Line(Math.cos(Math.PI/180 * $scope.base.angle), Math.sin(Math.PI/180 * $scope.base.angle), $scope.base.width * 2 + $scope.base.padding * 2),
      rtA = Math.cos(Math.PI/180 * (-$scope.base.angle)),
      rtB = Math.sin(Math.PI/180 * (-$scope.base.angle)),
      topRightLine = new Line(rtA, rtB, - $scope.base.size * rtA),
      topRight2Line = new Line(rtA, rtB, - $scope.base.size * rtA - $scope.base.width),
      topRight3Line = new Line(rtA, rtB, - $scope.base.size * rtA - $scope.base.width - $scope.base.padding),
      topRight4Line = new Line(rtA, rtB, - $scope.base.size * rtA - $scope.base.width * 2 - $scope.base.padding),
      topRight5Line = new Line(rtA, rtB, - $scope.base.size * rtA - $scope.base.width * 2 - $scope.base.padding * 2);

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
      bottomLine,
      topLeftLine,
      topLeft2Line,
      topLeft3Line,
      topLeft4Line,
      topLeft5Line,
      topRightLine,
      topRight2Line,
      topRight3Line,
      topRight4Line,
      topRight5Line
    ];

    $scope.$watchCollection('base', function () {
      console.log($scope.base);
      left2Line.C = topLeft2Line.C = $scope.base.width;
      left3Line.C = topLeft3Line.C = $scope.base.width + $scope.base.padding;
      left4Line.C = topLeft4Line.C = $scope.base.width * 2 + $scope.base.padding;
      left5Line.C = topLeft5Line.C = $scope.base.width * 2 + $scope.base.padding * 2;
      rightLine.C = $scope.base.size;
      right2Line.C = $scope.base.size - $scope.base.width;
      right3Line.C = $scope.base.size - $scope.base.width - $scope.base.padding;
      right4Line.C = $scope.base.size - $scope.base.width * 2 - $scope.base.padding;
      right5Line.C = $scope.base.size - $scope.base.width * 2 - $scope.base.padding * 2;
      bottomLine.C = $scope.base.size;
      topLeftLine.A = topLeft2Line.A = topLeft3Line.A = topLeft4Line.A = topLeft5Line.A = Math.cos(Math.PI/180 * $scope.base.angle);
      topLeftLine.B = topLeft2Line.B = topLeft3Line.B = topLeft4Line.B = topLeft5Line.B = Math.sin(Math.PI/180 * $scope.base.angle);

      rtA = Math.cos(Math.PI/180 * (-$scope.base.angle));
      rtB = Math.sin(Math.PI/180 * (-$scope.base.angle));
      topRightLine.A = topRight2Line.A = topRight3Line.A = topRight4Line.A = topRight5Line.A = rtA;
      topRightLine.B = topRight2Line.B = topRight3Line.B = topRight4Line.B = topRight5Line.B = rtB;
      topRightLine.C = - $scope.base.size * rtA;
      topRight2Line.C = - $scope.base.size * rtA - $scope.base.width;
      topRight3Line.C = - $scope.base.size * rtA - $scope.base.width - $scope.base.padding;
      topRight4Line.C = - $scope.base.size * rtA - $scope.base.width * 2 - $scope.base.padding;
      topRight5Line.C = - $scope.base.size * rtA - $scope.base.width * 2 - $scope.base.padding * 2;
    });

  });

