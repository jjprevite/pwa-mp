//model/apps.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var AppsSchema = new Schema({
    author: String,
    category: String,
    date_added: Date,
    description: String,
    icon: String,
    image: String,
    link: String,
});

//export our module to use in server.js
module.exports = mongoose.model('App', AppsSchema);