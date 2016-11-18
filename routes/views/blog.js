var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
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
	
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.where('state', 'published')
			.populate('author categories');
		
		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
			if (locals.data.category.order == "chronological") {
				q.sort('publishedDate')
			}
			if (locals.data.category.order == "reversed chronological") {
				q.sort('-publishedDate')
			}
			if (locals.data.category.order == "alphabetical") {
				q.sort('name')
			}

			if (locals.data.category.hide_old_posts) {
				if (locals.data.category.hide_old_posts != "false" && locals.filters.all != "all") {
					q.where("publishedDate").gte(new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000))
				}
			}

		}

		else {
			q.sort('-publishedDate')
		}
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('blog');
	
};
