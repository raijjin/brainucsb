First, go to /templates/views and create a file called name.jade where 'name' is the name of the new page you're adding.

Then, create a name.js file here that loads the jade file. Copy the template in EXAMPLE.js. You will need to program in extra functionality if the page will require special user interaction - look at blog.js, post.js etc for examples.

Finally, you must go to /routes/index.js and add the view with app.get().

You must restart the server for the changes to take affect.