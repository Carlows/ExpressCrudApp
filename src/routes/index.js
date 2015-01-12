var express = require('express');
var router = express.Router();
var validator = require('validator');
var peopleModel = require('./../models/people');
var bulkData = require('./../helpers/data');

/* GET home page. */
router.get('/', function(req, res) {
	peopleModel.find(function(err, data){
		if(err){
			return next(err);
		}

  	res.render('index', { people: data });
	});

});

/* GET add people */
router.get('/add', function(req, res){
	res.render('agregar');
});

/* POST agregar personas */
router.post('/add', function(req, res){
	// dentro de req.body están los datos que mando el formulario HTML
	var nuevaPersona = new peopleModel({
		name: req.body.name,
		lastname: req.body.lastname,
		age: req.body.age,
		university: req.body.university
	});

	nuevaPersona.save(function(err){
		if(err){
			res.render('agregar', { error: true, persona: nuevaPersona })
		} else {
			res.redirect('/');
		}
	});
});

/* GET people json */
router.get('/peoplejson', function(req, res){
	peopleModel.find(function(err, ppl){
		if(err){
			res.status(500).json({error: "There was an error retrieving the people document."});
		}
		res.json({people: ppl});
	});
});

/* GET generate people json */
router.get('/generatepeoplejson', function(req, res){
	res.json(bulkData);
});

module.exports = router;