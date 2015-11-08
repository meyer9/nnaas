var mongoose = require('mongoose');
var synaptic = require('synaptic');

var schema = mongoose.Schema
var networkSchema = new schema({
	apiKey: String,
	network: Object,
	name: String
});

module.exports = mongoose.model('Network', networkSchema);


