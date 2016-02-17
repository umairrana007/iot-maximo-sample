## iot-maximo

# Steps:

1. fork this project
2. `git clone` your project
3. update some files:
	1. config/production.json
		1. add your Maximo configuration
		2. add you mqtt topic for subscription (the one you'll receive payloads to perform actions using ibm-maximo-api)
	2. update README.md
		1. replace `<rep>` on last line with your repository link. Like: `https://github.com/username/iot-maximo`
4. `git add`, `git commit`, `git push` your changes
5. click the "Deploy to Bluemix" button.

# Deploy your project

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=<rep>)
