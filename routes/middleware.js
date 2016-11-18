/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: 'Explore',		key: 'home',		items: ['about', 'events', 'grants', 'worldwide', 'blog'], 	href: '/',			dropdown: [
																										{ label: 'About',					key: 'about',				href: '/about', 			description: "What is the UCSB Brain Initiative?"},
																				 						{ label: 'News and Events',		key: 'events',		href: '/blog/news', 		description: "Find out what's happening!"},
																				  						{ label: 'Grant Opportunities',		key: 'grants',		href: '/grants', 		description: "Coming soon!"}
																				 						//{ label: 'BRAIN Initiative Worldwide',		key: 'worldwide',		href: '/', 		description: "What is the Federal BRI? "}
																				  ]},
		{ label: 'Research',	key: 'research',		items: ['light','force','time', 'action'],	href: '/blog/events', 		dropdown: [
																				  						{ label: 'Light',				key: 'Light',			href: '/Light', 			description: "Find out how we're inventing new ways of seeing the brain"},
																									  	{ label: 'Force',		key: 'force',		href: '/force', 		description: "Find out how we're combating traumatic brain injury"}, 
																									  	{ label: 'Time',			key: 'time',			href: '/time', 			description: "Find out how we're fighting neurodegeneration and aging"},
																									  	{ label: 'Action',			key: 'action',			href: '/action', 			description: "Find out how we're cracking the brain code"}
																				  ]},
		{ label: 'People',		key: 'people',		href: '/people', 	dropdown:[]},
		//{ label: 'Fund',		key: 'fund',		href: '/fund', 	dropdown:[]},
		{ label: 'Contact',		key: 'contact',		href: '/contact', 	dropdown:[]}
	];
	
	locals.user = req.user;
	
	next();
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};
