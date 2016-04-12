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
# Editing on Bluemix

## Steps:

1. [fork](https://github.com/nerygustavo/iot-maximo/fork) this project
2. click the "Deploy to Bluemix" button.
 [![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=<rep>)
4. Once the app has been deployed, enter on the app dashboard at Bluemix and click on the button Edit Code.
5. Update some files:
	1. config/production.json
		1. update `maximo-options` with your Maximo configuration
		2. update `mqtt-topic` with your topic for subscription (the one you'll get payloads to perform actions on Maximo)
6. Click on the Git icon, commit and push the files changed
7. Click on Build and Deploy button. Run the Build Stage and then the Deploy Stage.
8. See detailed steps at https://hub.jazz.net/docs/edit/

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
