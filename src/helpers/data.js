var faker = require('faker');
var _ = require('underscore');

var data = {
	people: _.times(1000, function(n){
		return {
			name: faker.name.firstName(),
			lastname: faker.name.lastName(),
			age: _.random(1,60),
			university: faker.address.city()
		}
	})
};

module.exports = data;