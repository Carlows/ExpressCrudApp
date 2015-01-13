var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var peopleSchema = new Schema({
	name: { type: String, required: 'name is required!' },
	lastname: { type: String, required: 'lastname is required!' },
	age: { type: Number, min:10, max: 60 },
	university: { type: String, required: 'university is required!'}
}, {collection: 'people'});

module.exports = mongoose.model('People', peopleSchema);