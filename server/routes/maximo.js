(function() {

	var express = require('express');
	var Q = require('q');
	var fs = require("fs");
	var Maximo = require('../../ibm-maximo-api'); // Reference to Maximo OSLC API
	var config = require('config');

	var router = express.Router();

	// middleware to use for all requests
	router.use(function(req, res, next) {
		console.log('Request received by node middleware ...');
		next(); // make sure we go to the next routes and don't stop here
	});

	// Maximo connection details. Change these props for your Maximo
	var options = config.get('maximo-options');

	router.get('/', function(req, res) {
		res.send('Please use createwo, querywo or updatewo routes.');
	});

	// Queries a Work Order
	router.get('/querywo/:wonum/:siteid/:assetnum?', function(req, res) {
		var maximo = new Maximo(options);
		var resource = maximo.resourceobject("MXWODETAIL")
			.select(["wonum", "description", "location", "assetnum", "status"])
			.where("status").in(["WAPPR", "APPR"])
			.and("siteid").equal(req.params.siteid)
			.and("wonum").equal(req.params.wonum);

		if (req.params.assetnum)
			resource.and("assetnum").equal(req.params.assetnum);

		resource.orderby('wonum', 'desc')
			.pagesize(20)
			.fetch()
			.then(function(resourceset) {
				jsondata = resourceset.thisResourceSet();
				res.json(jsondata);
				console.log('test resource set');
			})
			.fail(function(error) {
				console.log('****** Error Code = ' + error);
			});
	});

	// Creates a Workorder
	router.get('/createwo/:desc/:assetnum', function(req, res) {
		var wo = '';

		console.log('Param desc ' + req.params.desc);

		var required = {
			"description": req.params.desc,
			"siteid": "BEDFORD",
			"assetnum": req.params.assetnum
		}

		console.log('Param desc required ' + JSON.stringify(required));

		var maximo = new Maximo(options);

		maximo.resourceobject("MXWODETAIL")

		.create(required, ["wonum", "description", "assetnum"])
			.then(function(resource) {
				jsondata = resource.JSON();
				res.json(jsondata);
			})
			.fail(function(error) {
				console.log('****** Error Code = ' + error);
			});
	});

	// Update a Work Order
	router.get('/updatewo/query/:wonum/:siteid/attrib/:desc', function(req, res) {

		var maximo = new Maximo(options);

		maximo.resourceobject("MXWODETAIL")
			.select(["wonum", "description", "location", "status"])
			.where("status").in(["WAPPR", "APPR", "INPRG"])
			.and("siteid").equal(req.params.siteid)
			.and("wonum").equal(req.params.wonum)
			.orderby('wonum', 'desc')
			.pagesize(20)
			.fetch()
			.then(function(resourceset) {

				var uri = resourceset.thisResourceSet()[0];

				var updates = {
					"spi:description": req.params.desc
				}

				maximo.resourceobject("MXWODETAIL")
					.resource(uri)
					.update(updates, ["wonum", "description"])
					.then(function(resource) {
						var jsondata = resource.JSON();
						res.json(jsondata);
					})
					.fail(function(error) {
						console.log('****** 2 - Error Code = ' + error);
					});

			})
			.fail(function(error) {
				console.log('****** 1- Error Code = ' + error);
			});

	});

	// Change a Work Order status
	router.get('/updatewo/query/:wonum/:siteid/changestatus/:status', function(req, res) {
		var maximo = new Maximo(options);

		maximo.resourceobject("MXWO")
			.select(["wonum", "description", "location", "status"])
			.where("status").in(["WAPPR", "APPR", "INPRG"])
			.and("siteid").equal(req.params.siteid)
			.and("wonum").equal(req.params.wonum)
			.orderby('wonum', 'desc')
			.pagesize(20)
			.fetch()
			.then(function(resourceset) {

				var uri = resourceset.thisResourceSet()[0];

				var updates = {
					"spi:status": req.params.status
				}

				maximo.resourceobject("MXWODETAIL")
					.resource(uri)
					.update(updates, ["wonum", "status"])
					.then(function(resource) {
						var jsondata = resource.JSON();
						res.json(jsondata);
					})
					.fail(function(error) {
						console.log('****** Error Code = ' + error);
					});

			})
			.fail(function(error) {
				console.log('****** Error Code = ' + error);
			});

	});

	module.exports = router;
}());