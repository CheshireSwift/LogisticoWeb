var Crafty = require('craftyjs');
var _ = require('lodash');

_.assign(exports, {
  layer: selectionLayer
});

function selectionLayer() {
  var mouseDown;
  var selectionBox = Crafty.e('2D, DOM, Color')
  .attr({
    x: -1, y: -1, w: -1, h: -1,
    z: 1000,
    alpha: 0.5
  });

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
