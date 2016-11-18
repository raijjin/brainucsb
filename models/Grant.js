var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Grant Model
 * ==========
 */

var Grant = new keystone.List('Grant', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Grant.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	image: { type: Types.CloudinaryImage },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	categories: { type: Types.Relationship, ref: 'PeopleCategory', many: true }
});

Grant.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Grant.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Grant.register();