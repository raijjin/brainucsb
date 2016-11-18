var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};
	
	// Load the current post
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).populate('author categories');
		
		q.exec(function(err, result) {
			locals.data.post = result;
			next(err);
		});
		
	});
	
	// Load other posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model
			.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author')
			.populate('categories')
			.limit('10');
		
		q.exec(function(err, results) {
			console.log('Post query', results);

			const events = results.filter(post => {
				const categories = post.categories.map(cat => cat.key);
				return categories.includes('events')
			});

			const posts = results.filter(post => {
				const categories = post.categories.map(cat => cat.key);
				return !categories.includes('events')
			});

			locals.data.posts = posts;
			locals.data.events = events;
			next(err);
		});
		
	});

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		category: req.params.category,
		all: req.params.all

	};
	locals.data = {
		posts: [],
		categories: []
	};
	
	// Load all categories
	view.on('init', function(next) {
		
		keystone.list('PostCategory').model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.categories = results;
			
			// Load the counts for each category
			async.each(locals.data.categories, function(category, next) {
				
				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function(err, count) {
					category.postCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
			
		});
		
	});
	
	// Load the current category filter
	view.on('init', function(next) {
		
		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'profile';
	
	// Render the view
	view.render('profile');
	//For example
	//view.render(photonics)
	
};