var mongoose = require('mongoose');
var synaptic = require('synaptic');

var schema = mongoose.Schema
var networkSchema = new Schema({
	apiKey: String,
	network: {
		neurons: [synaptic.Neuron],
		connections: [synaptic.Connection]
	}
});



