var express = require('express');
var router = express.Router();
var validator = require('validator');
var peopleModel = require('./../models/people');
var bulkData = require('./../helpers/data');
var colors = require('colors');
var _ = require('underscore');

/* GET generate people json */
router.get('/bulkpeople', function(req, res){
	return res.json(bulkData);
});

/* GET find all people json */
router.get('/people', function(req, res){
	peopleModel.find(function(err, ppl){
		if(err){
			errorLogging(err);
			return res.status(500).json({error: "There was an error retrieving the people document."});
		}

		return res.json({people: ppl});
	});
});

/* GET find person by ID */
router.get('/people/:id', function(req, res, next){
	var id = req.params.id;

	// resulta que mongoose espera que los id's sean ObjectID, asi que no puedes pasar valores como
	// 'foo' ó '123', deben ser strings de 24 caracteres, IE: 41224d776a326fb40f000001.
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
  	return res.status(400).json({ error: "The ID must be a valid ObjectID." });
	}

	peopleModel.findById(id, function (err, person){
  	if(err){
  		errorLogging(err);
  		return res.status(500).json({ error: "There was an error processing the request." });
  	}else{
  		if(!person){
  			return res.status(404).json({ error: "No record found." });
  		}

  		return res.json(person);
  	}  	
	});
});

/* POST agregar personas */
router.post('/people', 
	function(req, res, next){
		var nuevaPersona = new peopleModel({
			name: req.body.name,
			lastname: req.body.lastname,
			age: req.body.age,
			university: req.body.university
		});

		nuevaPersona.save(function(err){
			if(err){
				if(err.errors){
	  			errorLogging(err);
					return res.status(400).json({ error: "Invalid data." });
				}

	  		errorLogging(err);
				return res.status(500).json({ error: "There was an error processing the request." });
			} else {
				return res.json(nuevaPersona);
			}
		});
});

var errorLogging = function(err){
	console.log(" - " + "Error".red + " - Se produjo un error: " + err);
}

module.exports = router;
