## iot-maximo-sample

---
# Editing on GitHub

## Steps:

1. [fork](https://github.com/nerygustavo/iot-maximo/fork) this project
2. edit the following files:
	1. config/production.json
		1. update `maximo-options` with your Maximo configuration
		2. update `mqtt-topic` with your topic for subscription (the one you'll get payloads to perform actions on Maximo)
	2. update README.md
		1. replace `<rep>` on step 4 of this section with your repository link. Like: `https://github.com/USERNAME/iot-maximo`
3. click the "Deploy to Bluemix" button.
4. [![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=<rep>)

---
# Running on Bluemix

## Steps:

1. [fork](https://github.com/nerygustavo/iot-maximo/fork) this project
2. `git clone` your project
3. update some files:
	1. config/production.json
		1. update `maximo-options` with your Maximo configuration
		2. update `mqtt-topic` with your topic for subscription (the one you'll get payloads to perform actions on Maximo)
	2. update README.md
		1. replace `<rep>` on step 6 of this section with your repository link. Like: `https://github.com/USERNAME/iot-maximo`
4. `git add`, `git commit`, `git push` your changes
5. click the "Deploy to Bluemix" button.
6. [![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=<rep>)

---
# Running locally

## Steps:

1. [fork](https://github.com/nerygustavo/iot-maximo/fork) this project
2. `git clone` your project
3. update some files:
	1. config/default.json
		1. update `maximo-options` with your Maximo configuration
		2. update `mqtt-topic` with your topic for subscription (the one you'll get payloads to perform actions on Maximo)
		3. update `iotf-service` with your Watson IoT Platform service credentials.
4. run `node app.js`
