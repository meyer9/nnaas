var Network = require('../models/Network');
var createNetwork = require('../NeuralNet.js');
var util = require('../util.js');

/**
* POST /input
* Adds a new network to the db 
*/
exports.postNewNetwork = function (req, res) {
	if (req.user) {
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
			apiKey: util.getAPIKey(16),
			network: neuralNetwork.toJSON(),
			name: networkName,
			userId: userId
		});

		network.save();

		res.redirect("/networks");
	}
	else {
		res.sendStatus(403);
	}
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

/**
* GET /networks
* shows networks of user in a table
*/
exports.getNetworks = function (req, res) {
	var userid = req.user.id;
	Network.find({userId: userid}, function (err, networks) {
		if (!err) {
			res.json(networks);
		} 
		else {
			res.sendStatus(403);
		}
	});
}

/**
* POST /networks/delete
* deletes a network
*/
exports.deleteNetwork = function (req, res) {
	var networkID = req.body.networkID;
	Network.findOneAndRemove({_id: networkID}, function (err) {
		if (err) {
			res.sendStatus(403);
		}
		else {
			res.send("Deleted!");
		}
	});

}

