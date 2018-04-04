var layer = null;

export var init = function(e) {
  layer = e;
}

export var close = function() {
  layer && layer.close();
}

export var show = function(component) {
  layer && layer.show(component);
}

export var minimize = function() {
  layer && layer.minimize();
}