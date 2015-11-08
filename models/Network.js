var mongoose = require('mongoose');
var synaptic = require('synaptic');

id = mongoose.Types.ObjectId;

var schema = mongoose.Schema
var networkSchema = new schema({
	apiKey: String,
	network: Object,
	name: String,
	userId: {type: schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Network', networkSchema);


