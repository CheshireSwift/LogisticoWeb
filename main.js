var Crafty = require('craftyjs');
var _ = require('lodash');

window.onload = function() {
  //Crafty.init(500, 350, document.getElementById('game'));
  Crafty.init();
  //Crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('#00CCFF');
  var iso = Crafty.isometric.size(128);
  var tiles = _.map(_.range(8), function(i) {
    return _.map(_.range(8), function(y) {
      var color = '#00' + (8 * (y+1) + 10) + 'FF'
      return Crafty.e('2D, DOM, Color').attr({w: 72, h: 72, z: y}).color(color);
    });
  });

  _.map(tiles, function(row, i) {
    _.map(row, function(tile, y) {
      iso.place(i, y, 0, tile);
    });
  });
}

