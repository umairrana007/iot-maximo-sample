'use strict';

(function() {
	// MQTT connection
	var config = require('config');
	var request = require('request');
	var mqtt = require('./mqtt/Client');

	var host = 'localhost:3000';
	if (process.env.VCAP_APPLICATION) {
		var vcap = JSON.parse(process.env.VCAP_APPLICATION);
		host = vcap.uris[0];
	}
	host = 'http://' + host + '/maxtest/';

	var processGetRequest = function(path) {
		request.get(host + path)
			.on('response', function(response) {
				console.log('received JSON: ' + JSON.stringify(response));
			})
			.on('data', function(data) {
				console.log('data JSON: ' + data);
			});
	};

	var init = function() {

		var mqttClient = mqtt.connect();
		
		mqttClient.subscribe(config.get('mqtt-topic'));

		mqttClient.on('message', function(topic, message, packet) {
			var payload = JSON.parse(message);

			console.log('received message: ' + JSON.stringify(payload));
			console.log('Action: ' + payload.action);

			var path = '/';
			switch (payload.action) {
				case "query":
					// payload example:
					// {"action":"query","attr":{"wonum":"1000","siteid":"BEDFORD"}}
					// {"action":"query","attr":{"wonum":"1000","siteid":"BEDFORD","assetnum":"11300"}}
					path = 'querywo/' + payload.attr.wonum + '/' + payload.attr.siteid;
					if (payload.attr.assetnum) {
						path = path + '/' + payload.attr.assetnum;
					}
					break;
				case "create":
					// payload example:
					// {"action":"create","object":"wo","data":{"desc":"fromAPI","assetnum":"11300"}}
					path = 'createwo/' + payload.data.desc + '/' + payload.data.assetnum;
					break;
				case "update":
					// payload example:
					// {"action":"update","attr":{"wonum":"1000","siteid":"BEDFORD"},"data":{"desc":"UpdateFromAPI"}}			
					path = 'updatewo/query/' + payload.attr.wonum + '/' + payload.attr.siteid + '/attrib/' + payload.data.desc;
					break;
			}
			processGetRequest(path);
		});
	};

	module.exports = {
		init: init
	}
})();