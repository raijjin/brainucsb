var keystone = require('keystone');

/**
 * PeopleCategory Model
 * ==================
 */

var PeopleCategory = new keystone.List('PeopleCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

PeopleCategory.add({
	name: { type: String, required: true }
});

PeopleCategory.relationship({ ref: 'People', path: 'categories' });

PeopleCategory.register();
