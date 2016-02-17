'use strict';

(function() {
	// MQTT connection
	var config = require('config');
	var mqtt = require('./mqtt/Client');

	var host = host = 'localhost:3000';
	if (process.env.VCAP_APPLICATION) {
		var vcap = JSON.parse(process.env.VCAP_APPLICATION);
		host = vcap.uris[0];
	}


	var init = function() {

		var mqttClient = mqtt.connect();

		mqttClient.subscribe(config.get('mqtt-topic'));

		mqttClient.on('message', function(topic, message, packet) {

			var payload = JSON.parse(message);

			console.log('received message: ' + JSON.stringify(payload));
			console.log('Action: ' + payload.action);

			//open payload
			//switch according actions
			//each action - get different router

			switch (payload.action) {
				//Ex payload: {"action":"query","object":"wo","attr":{"wonum":"1000","siteid":"BEDFORD","assetnum":"11300"}}
				case "query":
					request
						.get('http://' + host + '/maxtest/query' + payload.object + '/' + payload.attr.wonum + '/' + payload.attr.siteid + '/' + payload.attr.assetnum)
						.on('response', function(response) {
							console.log('received JSON: ' + JSON.stringify(response));
						})
						.on('data', function(data) {
							console.log('data JSON: ' + data);
						});
					break;
					//Ex payload: 	{"action":"create","object":"wo","data":{"desc":"fromAPI","assetnum":"11300"}}
				case "create":
					if (payload.object == 'wo') {
						request
							.get('http://' + host + '/maxtest/create' + payload.object + '/' + payload.data.desc + '/' + payload.data.assetnum)
							.on('response', function(response) {
								console.log('received JSON: ' + JSON.stringify(response));
							})
							.on('data', function(data) {
								console.log('data JSON: ' + data);
							});
					}
					else if (payload.object == 'incident') {
						request
							.get('http://' + host + '/maxtest/create' + payload.object + '/' + payload.data.desc + '/' + payload.data.location)
							.on('response', function(response) {
								console.log('received JSON: ' + JSON.stringify(response));
							})
							.on('data', function(data) {
								console.log('data JSON: ' + data);
							});
					}
					break;
					//Ex payload: 	{"action":"update","object":"wo","attr":{"wonum":"1000","siteid":"BEDFORD"},"data":{"desc":"UpdateFromAPI"}}			
				case "update":
					request
						.get('http://' + host + '/maxtest/update' + payload.object + '/query/' + payload.attr.wonum + '/' + payload.attr.siteid + '/attrib/' + payload.data.desc)
						.on('response', function(response) {
							console.log('received JSON: ' + JSON.stringify(response));
						})
						.on('data', function(data) {
							console.log('data JSON: ' + data);

						});
					break;
			}
		});
	};

	module.exports = {
		init: init
	}
})();