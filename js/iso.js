var Crafty = require('craftyjs');
var _ = require('lodash');

_.assign(exports, {
  grid: isoGrid
});

function isoGrid() {
  var iso = Crafty.isometric.size(128);
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

  return {
    craftyIso: iso,
    tiles: tiles
  };
}
