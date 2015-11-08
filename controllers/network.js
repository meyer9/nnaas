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
	var userId = req.user.id;

	var neuralNetwork = createNetwork(inputNeurons,neuronsInHiddenLayer,outputNeurons,hiddenLayers);

	var network = new Network({
		apiKey: getAPIKey(16),
		network: neuralNetwork.toJSON(),
		name: networkName,
		userId: userId
	});

	network.save();

	res.send(network);
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

var getAPIKey = function (length) {
	possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	key = ""
	for (var i = 0; i < length; i++) {
		key += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return key;
}
