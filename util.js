var Util = {

};

/*
* returns a randomly generated api key
*/
Util.getAPIKey = function (length) {
	possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	key = ""
	for (var i = 0; i < length; i++) {
		key += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return key;
}

module.exports = Util;
