var rj = require("rot-js")
var fs = require('fs');

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

function saveMapCSV(mapStore, filepath, width, height) {

  var csvText = "";
  
  for(var x = 0; x < width; x++) {
    for(var y = 0; y < height; y++) {
      if(mapStore[width * y + x] == 1) {
	csvText = csvText.concat("1,");
      }
      else {
	csvText = csvText.concat("0,");
      }
    }
    csvText = csvText.slice(0, -1);
    csvText = csvText.concat("\n");
  }
  csvText = csvText.slice(0, -1);
  
  fs.writeFile(filepath, csvText, function(err) {
    if(err) {
      return console.log(err);
    }

    console.log(filepath + " was saved!");
  });
}

//main

var args = process.argv.slice(2);

if(args.length < 4) {
  console.log("Usage: node dungeongen.js <width> <height> <numberOfMaps> <pathToSaveFiles>");
  return;
}

var w = args[0], h = args[1];
var noFiles = args[2];
var path = args[3];

for(var f = 0; f < noFiles; f++) {
  mapStore = buildMap(w, h);
  drawMap(mapStore, w, h);
  var filepath = path + "/" + "map" + f.toString() + ".csv";
  saveMapCSV(mapStore, filepath, w, h);
}
