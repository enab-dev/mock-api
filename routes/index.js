/*
 * GET home page.
 */

exports.index = function(req, res) {
	var latency = req.app.settings['options'].latency;
	console.log('Responding with latency of ' + latency + 'ms!');
	setTimeout(function() {
		res.send(req.app.settings['options'].data);
	}, latency);
};