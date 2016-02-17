(function() {

	var mqtt = require('mqtt');
	var config = require('config');

	function MQTTClient() {
		this.hostPort = 8883;
		this.organization = '';
		this.user = '';
		this.pass = '';
		this.client = null;
	}

	MQTTClient.prototype.port = function(port) {
		this.hostPort = port;
		return this;
	};
	MQTTClient.prototype.org = function(org) {
		this.organization = org;
		return this;
	};
	MQTTClient.prototype.getServer = function() {
		if (this.organization)
			return this.organization + '.messaging.internetofthings.ibmcloud.com:' + this.hostPort;
		return '';
	};
	MQTTClient.prototype.getClientId = function() {
		var result = '';
		if (this.organization)
			result = 'a:' + this.organization + ':iot-maximo_' + (new Date()).getTime();
		return result;
	};

	MQTTClient.prototype.username = function(username) {
		this.user = username;
		return this;
	};
	MQTTClient.prototype.password = function(password) {
		this.pass = password;
		return this;
	};
	MQTTClient.prototype.connect = function() {
		this.loadConfig();
		if (this.hostPort && this.org && this.user && this.pass) {

			console.log('connecting to: ' + this.getServer());

			this.client = mqtt.connect('mqtts://' + this.getServer(), {
				'clientId': this.getClientId(),
				'keepalive': 0,
				'username': this.user,
				'password': this.pass
			});
			this.client.on('connect', function() {
				console.log('MQTT client connected to IBM IoT Cloud.');
			});
			this.client.on('error', function(error) {
				console.log(error);
			});
		}
		return this.client;
	};

	MQTTClient.prototype.loadConfig = function() {
		var services = {};
		if (process.env.VCAP_SERVICES) {
			var vcap = JSON.parse(process.env.VCAP_SERVICES);
			services = vcap['iotf-service'];
		}
		else {
			services = config.get('iotf-service');
		}

		var iotName = config.get('iotf-service-name');
		for (var index in services) {
			if (services[index].name === iotName) {
				iotService = services[index];
				break;
			}
		}
		if (iotService) {
			this.org(iotService.credentials.org).port(iotService.credentials.mqtt_s_port).username(iotService.credentials.apiKey).password(iotService.credentials.apiToken);
		}

		return this;
	};
	MQTTClient.prototype.printConfig = function() {
		console.log(this);
	};

	var mqttClient = new MQTTClient();

	module.exports = mqttClient;
}());