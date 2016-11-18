var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'WRITE IN THE KEY FROM LOCALS.NAVLINKS IN MIDDLEWARE.JS.';
	
	// Render the view
	view.render('WRITE IN THE NAME OF THE .JADE FILE THAT GENERATES THE HTML, WITHOUT THE .JADE EXTENSION');
	//For example
	//view.render(photonics)
	
};
