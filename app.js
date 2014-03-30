var express = require('express'),
replify = require('replify'),
http = require('http'),
path = require('path'),
routes = require('./routes'),
app = express(),
options = {latency: 0, data: {server: 'OK'}};

replify('api-mock-server', app);

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);

// allows for latency to be set
app.latency = function(latency) {
	options.latency = latency || options.latency;
	app.configure(function() {
		app.set('options', options);
	});
	var logString = ('Latency set to '+options.latency+'ms!');
	console.log(logString);
	return logString;
}
// set default latency
app.latency();

// allows for data to be set
app.data = function(data) {
	options.data = data || options.data;
	app.configure(function() {
		app.set('options', options);
	});
	var logString = ('data set to '+JSON.stringify(options.data)+'!');
	console.log(logString);
	return logString;
}
// set default data
app.data();

// allows for route to be set
app.route = function(route) {
	route = route || '/'; 
	app.get(route, routes.index);
	var logString = ('Route set to \''+route+'\'!');
	console.log(logString);
	return logString;
}
// set default route
app.route();

http.createServer(app).listen(app.get('port'), function(){
  console.log('API mock server listening on port ' + app.get('port'));
});

