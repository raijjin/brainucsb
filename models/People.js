var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * People Model
 * ==========
 */

var People = new keystone.List('People', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

People.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'PeopleCategory', many: true }
});

People.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

People.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
People.register();
