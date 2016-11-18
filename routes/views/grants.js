var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Init locals

	locals.section = 'grants';
	locals.data = {
		grants: []
	};

	// Load the grant opportunities
	view.on('init', function(next) {
		
		var q = keystone.list('Grant').paginate({
				page: req.query.page || 1,
				perPage: 8,
				maxPages: 10,
			})
			.where('state', 'published')
	
		q.exec(function(err, results) {
			locals.data.grants = results;
			next(err);
		});
		
	});
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'grants';
	
	// Render the view
	view.render('grants');
	//For example
	//view.render(photonics)
	
};
