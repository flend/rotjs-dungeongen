var rj = require("rot-js")

var w = 40, h = 40;

function buildMap(width, height) {

  var mapStore = new Array(width * height);

  var map = new rj.Map.Cellular(width, height, { connected: true });

  /* cells with 1/2 probability */
  map.randomize(0.5);

  /* generate and show four generations */
  var gen = 4;
  for (var i=0; i<gen; i++) {
    map.create();
  }

  map.connect(function(x, y, wall) {
    mapStore[width * y + x] = wall ? 1 : 0;
  });

  return mapStore;
}

function drawMap(mapStore, width, height) {

  var row = "";

  for(var x = 0; x < width; x++) {
    row = row.concat("-");
  }
  console.log(row);

  row = "";
  
  for(var x = 0; x < width; x++) {
    for(var y = 0; y < height; y++) {
      if(mapStore[width * y + x] == 1) {
	row = row.concat("#");
      }
      else {
	row = row.concat(" ");
      }
    }
    console.log(row);
    row = "";
  }

  for(var x = 0; x < width; x++) {
    row = row.concat("-");
  }
  console.log(row);

}

function drawMap(mapStore, width, height) {

  var row = "";

  for(var x = 0; x < width; x++) {
    row = row.concat("-");
  }
  console.log(row);

  row = "";
  
  for(var x = 0; x < width; x++) {
    for(var y = 0; y < height; y++) {
      if(mapStore[width * y + x] == 1) {
	row = row.concat("#");
      }
      else {
	row = row.concat(" ");
      }
    }
    console.log(row);
    row = "";
  }

  for(var x = 0; x < width; x++) {
    row = row.concat("-");
  }
  console.log(row);

}

mapStore = buildMap(w, h);
drawMap(mapStore, w, h);
