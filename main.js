var logistico = function() {
    var Crafty = require('craftyjs');
    var _ = require('lodash');

    return {
        init: init
    };

    function init() {
        //Crafty.init(500, 350, document.getElementById('game'));
        Crafty.init();
        //Crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('#00CCFF');
        var iso = Crafty.isometric.size(128);
        selectionLayer();
        var tiles = _.map(_.range(8), function() {
            return _.map(_.range(8), function(y) {
                var color = '#00' + (8 * (y+1) + 10) + 'FF'
                return Crafty.e('2D, DOM, Color').attr({w: 72, h: 72, z: y}).color(color);
            });
        });

        _.forEach(tiles, function(row, i) {
            _.forEach(row, function(tile, y) {
                iso.place(i, y, 0, tile);
            });
        });
    }

    function selectionLayer() {
        var mouseDown;
        var selectionBox = Crafty.e('2D, DOM, Color')
            .attr({x: 20, y: 20, w: 0, h: 0, z: 1000});

        var mouseLayer = Crafty.e('2D, DOM, Mouse')
            .attr({x: Crafty.viewport._x, y: Crafty.viewport._y, w: Crafty.viewport._width, h: Crafty.viewport._height})
            .bind('MouseDown', function (MouseEvent) {
                mouseDown = { x: MouseEvent.realX, y: MouseEvent.realY };
            })
            .bind('MouseUp', function () {
                mouseDown = undefined;
                selectionBox.h = 0;
                selectionBox.w = 0;
            })
            .bind('MouseMove', function (MouseEvent) {
                if (mouseDown) {
                    updateSelectionBox(MouseEvent);
                }
            });

        return {
            box: selectionBox,
            layer: mouseLayer
        };

        function updateSelectionBox(MouseEvent) {
            selectionBox.x = (MouseEvent.realX > mouseDown.x) ? mouseDown.x : MouseEvent.realX;
            selectionBox.y = (MouseEvent.realY > mouseDown.y) ? mouseDown.y : MouseEvent.realY;

            var width = Math.abs(MouseEvent.realX - mouseDown.x);
            var height = Math.abs(MouseEvent.realY - mouseDown.y);
            selectionBox.w = width;
            selectionBox.h = height;

            selectionBox.color('#FF' + Math.floor(10 + 40 * (1 + Math.sin((width + height) / 200))) + '00');
        }
    }
};

window.onload = logistico().init;

