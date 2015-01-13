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
			return res.render('agregar', { error: true, persona: nuevaPersona });
		} else {
			return res.redirect('/');
		}
	});
});


module.exports = router;