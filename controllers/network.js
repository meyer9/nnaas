var Network = require('../models/Network');
var Synaptic = require("synaptic");
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
		title: 'Create New Network'
	});
}

/**
* GET /networks
* shows json of networks of user in a table
*/
exports.getNetworks = function (req, res) {
	if (req.user) {
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
	else {
		res.sendStatus(403);
	}
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

/*
* Renders networks page
*/
exports.showNetworks = function(req, res) {
	res.render('networks',{
		title: 'Your Networks'
	});
};

/**
* POST /networks/train
* trains a network
*/
exports.trainNetwork = function (req, res) {
	var apiKey = req.body.apiKey;
	var query = Network.where({apiKey: apiKey});
	query.findOne(function (err, networkObj){
		if (err) {
			res.sendStatus(403);
		}
		else {
			networkObj.network = Synaptic.Network.fromJSON(networkObj.network);
			var trainingSet = req.body.trainingSet;
			var trainer = new Synaptic.Trainer(networkObj.network);
			trainer.train(trainingSet);
			networkObj.save();
			res.send("SUCCESS!");
		}
	});
}

/**
* POST networks/activate
* activates a network and runs an input through it
*/
exports.activateNetwork = function (req,res) {
	var apiKey = req.body.apiKey;
	var query = Network.where({apiKey: apiKey});
	query.findOne(function (err, network){
		if (err) {
			res.sendStatus(403);
		}
		else {
			var inputs = req.body.inputs;
			var outputs = network.activate(inputs);
			res.send(outputs);
		}
	});
}

/**
* POST /networks/test
* tests a network
*/
exports.testNetwork = function (req, res) {
	var apiKey = req.body.apiKey;
	var query = Network.where({apiKey: apiKey});
	query.findOne(function (err, network){
		if (err) {
			res.sendStatus(403);
		}
		else {
			var testSet = req.body.testSet;
			var trainer = Synapse.trainer(network);
			var results = trainer.test(testSet);
			res.send(results);
		}
	});
}
