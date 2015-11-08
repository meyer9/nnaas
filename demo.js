var fs = require('fs');
var request = require('request');

var key = '8uteqsUxJSyOYEuh';

var dataFileBuffer  = fs.readFileSync(__dirname + '/train-images-idx3-ubyte');
var labelFileBuffer = fs.readFileSync(__dirname + '/train-labels-idx1-ubyte');
var pixelValues     = [];
var trainingSet 	= [];


// It would be nice with a checker instead of a hard coded 60000 limit here
for (var image = 0; image <= 25; image++) { 
    var pixels = [];

    for (var x = 0; x <= 27; x++) {
        for (var y = 0; y <= 27; y++) {
            pixels.push(dataFileBuffer[(image * 28 * 28) + (x + (y * 28)) + 15]/255.0);
        }
    }

    var imageData  = {};

    training = [{"input": pixels, "output": [JSON.stringify(labelFileBuffer[image + 8])/9]}];
    request({
		method: "POST",
		uri: 'http://localhost:3000/networks/train',
		json: true,
		body: {"apiKey": key, "trainingSet": training}
	});
}