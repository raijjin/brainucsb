var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'people';
	locals.filters = {
		person: req.params.person
	};
	locals.data = {
		persons: []
	};
	
	// Load the current person
	view.on('init', function(next) {
		
		var q = keystone.list('People').model.findOne({
			state: 'published',
			slug: locals.filters.person
		}).populate('author categories');
		
		q.exec(function(err, result) {
			locals.data.person = result;
			next(err);
		});
		
	});
	
	// Load other persons
	view.on('init', function(next) {
		
		var q = keystone.list('People').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');
		
		q.exec(function(err, results) {
			locals.data.persons = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('person');
	
};
