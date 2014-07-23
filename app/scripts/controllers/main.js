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
      padding: 16
    };

    $scope.color1 = '#1E8A8E';
    $scope.color2 = '#C5C5C5';

    $scope.showLines = false;
    $scope.variant = 1;

    function Line(A, B, C) {
      this.A = A;
      this.B = B;
      this.C = C;

      this.x1 = function() {
        if (!this.A) {
          return 0;
        } else {
          return - ( this.C / this.A );
        }
      };

      this.y1 = function() {
        if (!this.A) {
          return - ( this.C / this.B );
        } else {
          return 0;
        }
      };

      this.x2 = function() {
        if (!this.A) {
          return $scope.base.size;
        } else {
          return - ( (this.B * $scope.base.size + this.C) / this.A );
        }
      };

      this.y2 = function() {
        if (!this.A) {
          return - ( (this.A * $scope.base.size + this.C) / this.B );
        } else {
          return $scope.base.size;
        }
      };

      this.intersection = function(other) {
        var point = new Point(0, 0);
        point.x = (this.B * other.C - other.B * this.C) / (this.A * other.B - other.A * this.B);
        point.y = (this.C * other.A - other.C * this.A) / (this.A * other.B - other.A * this.B);
        return point;
      };
    }

    function Point (x, y) {
      this.x = x;
      this.y = y;
    }
    Point.prototype.toString = function() {
      return this.x + ',' +this.y;
    };

    function Points () {
      this.points = [];
    }

    Points.prototype.toString = function() {
      var result = '';
      for (var i in this.points) {
        result += this.points[i] + '\n';
      }
      return result;
    };

    function Polygon () {
      this.points = new Points();
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
      topLeftLine = new Line(1, 0, 0),
      topLeft2Line = new Line(1, 0, 0),
      topLeft3Line = new Line(1, 0, 0),
      topLeft4Line = new Line(1, 0, 0),
      topLeft5Line = new Line(1, 0, 0),
      topRightLine = new Line(1, 0, 0),
      topRight2Line = new Line(1, 0, 0),
      topRight3Line = new Line(1, 0, 0),
      topRight4Line = new Line(1, 0, 0),
      topRight5Line = new Line(1, 0, 0);

    var
      leftTopPolygon = new Polygon(),
      rightTopPolygon = new Polygon(),
      centerTopPolygon = new Polygon(),
      leftBottomPolygon = new Polygon(),
      rightBottomPolygon = new Polygon(),
      centerBottomPolygon = new Polygon();

    var
      leftTop1Polygon2 = new Polygon(),
      leftTop2Polygon2 = new Polygon(),
      leftTop3Polygon2 = new Polygon(),
      leftTop4Polygon2 = new Polygon(),
      rightTop1Polygon2 = new Polygon(),
      rightTop2Polygon2 = new Polygon(),
      leftBottom1Polygon2 = new Polygon(),
      leftBottom2Polygon2 = new Polygon(),
      rightBottom1Polygon2 = new Polygon(),
      rightBottom2Polygon2 = new Polygon();

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

    $scope.polygonsA = [
      leftTopPolygon,
      rightTopPolygon,
      centerBottomPolygon
    ];
    $scope.polygonsB = [
      leftBottomPolygon,
      rightBottomPolygon,
      centerTopPolygon
    ];

    $scope.polygonsA2 = [
      leftTop1Polygon2,
      leftTop2Polygon2,
      leftTop3Polygon2,
      leftTop4Polygon2,
      rightTop1Polygon2,
      rightTop2Polygon2
    ];
    $scope.polygonsB2 = [
      leftBottom1Polygon2,
      leftBottom2Polygon2,
      rightBottom1Polygon2,
      rightBottom2Polygon2
    ];

    $scope.$watchCollection('base', function () {
      var ltA,ltB,rtA,rtB;

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

      ltA = - Math.cos(Math.PI/180 * $scope.base.angle);
      ltB = Math.sin(Math.PI/180 * $scope.base.angle);
      topLeftLine.A = topLeft2Line.A = topLeft3Line.A = topLeft4Line.A = topLeft5Line.A = ltA;
      topLeftLine.B = topLeft2Line.B = topLeft3Line.B = topLeft4Line.B = topLeft5Line.B = ltB;
      topLeft2Line.C = - $scope.base.width;
      topLeft3Line.C = - $scope.base.width - $scope.base.padding;
      topLeft4Line.C = - $scope.base.width * 2 - $scope.base.padding;
      topLeft5Line.C = - $scope.base.width * 2 - $scope.base.padding * 2;

      rtA = - Math.cos(Math.PI/180 * $scope.base.angle);
      rtB = - Math.sin(Math.PI/180 * $scope.base.angle);
      topRightLine.A = topRight2Line.A = topRight3Line.A = topRight4Line.A = topRight5Line.A = rtA;
      topRightLine.B = topRight2Line.B = topRight3Line.B = topRight4Line.B = topRight5Line.B = rtB;
      topRightLine.C = - $scope.base.size * rtA;
      topRight2Line.C = - $scope.base.size * rtA + $scope.base.width;
      topRight3Line.C = - $scope.base.size * rtA + $scope.base.width + $scope.base.padding;
      topRight4Line.C = - $scope.base.size * rtA + $scope.base.width * 2 + $scope.base.padding;
      topRight5Line.C = - $scope.base.size * rtA + $scope.base.width * 2 + $scope.base.padding * 2;

      //FIRST
      leftTopPolygon.points.points = [
        leftLine.intersection(topLine),
        left2Line.intersection(topLeftLine),
        left2Line.intersection(topLeft2Line),
        leftLine.intersection(topLeft2Line)
      ];

      rightTopPolygon.points.points = [
        rightLine.intersection(topLine),
        right2Line.intersection(topRightLine),
        right2Line.intersection(topRight2Line),
        rightLine.intersection(topRight2Line)
      ];

      centerBottomPolygon.points.points = [
        left3Line.intersection(bottomLine),
        left3Line.intersection(topLeft3Line),
        topRight3Line.intersection(topLeft3Line),
        right3Line.intersection(topRight3Line),
        right3Line.intersection(bottomLine),
        right4Line.intersection(bottomLine),
        right4Line.intersection(topRight4Line),
        topLeft4Line.intersection(topRight4Line),
        left4Line.intersection(topLeft4Line),
        left4Line.intersection(bottomLine)
      ];

      leftBottomPolygon.points.points = [
        leftLine.intersection(bottomLine),
        leftLine.intersection(topLeft3Line),
        left2Line.intersection(topLeft3Line),
        left2Line.intersection(bottomLine)
      ];

      rightBottomPolygon.points.points = [
        rightLine.intersection(bottomLine),
        rightLine.intersection(topRight3Line),
        right2Line.intersection(topRight3Line),
        right2Line.intersection(bottomLine)
      ];

      centerTopPolygon.points.points = [
        left3Line.intersection(topLeftLine),
        topLeftLine.intersection(topRightLine),
        right3Line.intersection(topRightLine),
        right3Line.intersection(topRight2Line),
        topLeft2Line.intersection(topRight2Line),
        left3Line.intersection(topLeft2Line)
      ];

      //SECOND
      leftTop1Polygon2.points.points = [
        leftLine.intersection(topLeftLine),
        left2Line.intersection(topLeftLine),
        left2Line.intersection(topLeft2Line),
        leftLine.intersection(topLeft2Line)
      ];
      leftTop2Polygon2.points.points = [
        leftLine.intersection(topLeft3Line),
        left2Line.intersection(topLeft3Line),
        left2Line.intersection(topLeft4Line),
        leftLine.intersection(topLeft4Line)
      ];
      leftTop3Polygon2.points.points = [
        left3Line.intersection(topLeftLine),
        left4Line.intersection(topLeftLine),
        left4Line.intersection(topLeft2Line),
        left3Line.intersection(topLeft2Line)
      ];
      leftTop4Polygon2.points.points = [
        left3Line.intersection(topLeft3Line),
        left4Line.intersection(topLeft3Line),
        left4Line.intersection(topLeft4Line),
        left3Line.intersection(topLeft4Line)
      ];
      rightTop1Polygon2.points.points = [
        left5Line.intersection(topLeftLine),
        topLeftLine.intersection(topRightLine),
        rightLine.intersection(topRightLine),
        rightLine.intersection(topRight2Line),
        topLeft2Line.intersection(topRight2Line),
        left5Line.intersection(topLeft2Line)
      ];
      rightTop2Polygon2.points.points = [
        left5Line.intersection(topLeft3Line),
        topLeft3Line.intersection(topRight3Line),
        rightLine.intersection(topRight3Line),
        rightLine.intersection(topRight4Line),
        topLeft4Line.intersection(topRight4Line),
        left5Line.intersection(topLeft4Line)
      ];
      leftBottom1Polygon2.points.points = [
        leftLine.intersection(bottomLine),
        leftLine.intersection(topLeft5Line),
        left2Line.intersection(topLeft5Line),
        left2Line.intersection(bottomLine)
      ];
      leftBottom2Polygon2.points.points = [
        left3Line.intersection(bottomLine),
        left3Line.intersection(topLeft5Line),
        left4Line.intersection(topLeft5Line),
        left4Line.intersection(bottomLine)
      ];
      rightBottom1Polygon2.points.points = [
        rightLine.intersection(bottomLine),
        rightLine.intersection(topRight5Line),
        right2Line.intersection(topRight5Line),
        right2Line.intersection(bottomLine)
      ];
      rightBottom2Polygon2.points.points = [
        right3Line.intersection(bottomLine),
        right3Line.intersection(topRight5Line),
        right4Line.intersection(topRight5Line),
        right4Line.intersection(bottomLine)
      ];
    });

  });

