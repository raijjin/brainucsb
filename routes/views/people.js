var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'people';
	locals.data = {
		people: []
	};
	
	
	// Load the people
	view.on('init', function(next) {
		
		var q = keystone.list('People').paginate({
				page: req.query.page || 1,
				perPage: 30,
				maxPages: 10,
			})
			.where('state', 'published')

		if (locals.data.people.order == "alphabetical") {
			q.sort('name')
		}
	
		q.exec(function(err, results) {
			locals.data.people = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('people');
	
};
