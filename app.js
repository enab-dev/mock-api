var express = require('express'),
	replify = require('replify'),
	http = require('http'),
	path = require('path'),
	app = express(),
	options = {
		latency: 0,
		data: {
			server: 'OK'
		}
	};

// set up a repl server
replify('api-mock-server', app);

// helper function to output result of REPL commands
var outputResult = function(message) {
	console.log(message);
	return message;
}

// allows for latency to be set
app.latency = function(latency) {
	options.latency = latency || options.latency;
	app.configure(function() {
		app.set('options', options);
	});
	return outputResult('Latency set to ' + options.latency + 'ms!');
}

// allows for data to be set
app.data = function(data) {
	options.data = data || options.data;
	app.configure(function() {
		app.set('options', options);
	});
	return outputResult('data set to ' + JSON.stringify(options.data) + '!');
}

// allows route to be set externally
app.route = function(route) {
	route = route || '/';
	app.get(route, function(req, res) {
		console.log('Responding with latency of ' + options.latency + 'ms!');
		setTimeout(function() {
			res.send(options.data);
		}, options.latency);
	});
	return outputResult('Route set to \'' + route + '\'!');
}

// initialize defaults
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.latency();
app.data();
app.route();

http.createServer(app).listen(app.get('port'), function() {
	console.log('API mock server listening on port ' + app.get('port'));
});