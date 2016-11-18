var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

PostCategory.add({
	name: { type: String, required: true },
  order: { type: Types.Select, options: 'chronological, reversed chronological, alphabetical', default: 'chronological', index: true },
  hide_old_posts: { type: Types.Select, options: 'true, false, optional', default: 'false', index: true }
});

PostCategory.relationship({ ref: 'Post', path: 'categories' });

PostCategory.register();
