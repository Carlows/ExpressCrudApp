var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var peopleSchema = new Schema({
	name: String,
	lastname: String,
	age: { type: Number, min:10, max: 60 },
	university: String
}, {collection: 'people'});

module.exports = mongoose.model('People', peopleSchema);