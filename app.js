(function() {

	var express = require('express');
	var request = require('request');

	var app = express();

	// setup routes
	var maximoRouter = require('./server/routes/maximo');
	app.use('/maxtest', maximoRouter);

	// init mqtt
	var mqttConnection = require('./server/mqttConnection');
	mqttConnection.init();

	// Start server
	var host = (process.env.VCAP_APP_HOST || 'localhost');
	var port = (process.env.VCAP_APP_PORT || 3000);
	app.listen(port, host);

	console.log('App started on port ' + port);
}());