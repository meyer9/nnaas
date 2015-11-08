var Network = require('../models/Network');
var createNetwork = require('../NeuralNet.js');

/**
* POST /input
* Adds a new network to the db 
*/
exports.postNewNetwork = function (req, res) {
	var hiddenLayers = req.body.hiddenLayers;
	var inputNeurons = req.body.inputNeurons;
	var outputNeurons = req.body.outputNeurons;
	var neuronType = req.body.neuronType;
	var networkType = req.body.networkType;
	var networkName = req.body.networkName;
	var neuronsInHiddenLayer = req.body.neuronsInHiddenLayer;
	
	var network = createNetwork(inputNeurons,neuronsInHiddenLayer,outputNeurons,hiddenLayers);

	res.send([hiddenLayers, inputNeurons, outputNeurons, neuronType, networkType, networkName, neuronsInHiddenLayer]);
}

/**
* GET /input
* shows information on a neural network
*/
exports.getNewNetwork = function (req, res) {
	res.render('input',{
		title: 'input'
	});
}
