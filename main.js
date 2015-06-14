window.onload = logistico;

function logistico() {
  var Crafty = require('craftyjs');
  var _ = require('lodash');
  var iso = require('./js/iso');
  var selection = require('./js/selection');

    Crafty.init();
    iso.grid();
    selection.layer();
};

