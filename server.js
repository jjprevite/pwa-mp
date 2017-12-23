//server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var App = require('./model/apps');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

//db config
var mongoDB = 'mongodb://joe:F^e49s#G@ds163796.mlab.com:63796/web-app-store';
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //and remove cacheing so we get the most recent apps
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now  we can set the route path & initialize the API
router.get('/', function (req, res) {
    res.json({ message: 'API Initialized!' });
});

//adding the /apps route to our /api router
router.route('/apps')
    //retrieve all apps from the database
    .get(function (req, res) {
        //looks at our App Schema
        App.find(function (err, apps) {
            if (err)
                res.send(err);
            //responds with a json object of our database apps.
            res.json(apps)
        });
    })
    //post new app to the database
    .post(function (req, res) {
        var app = new App();
        //body parser lets us use the req.body
        app.author = req.body.author;
        app.category = req.body.category;
        app.dateAdded = req.body.dateAdded;
        app.description = req.body.description;
        app.icon = req.body.icon;
        app.link = req.body.link;

        app.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'App successfully added!' });
        });
    });

//Adding a route to a specific app based on the database ID
router.route('/apps/:app_id')
    //The put method gives us the chance to update our app based on the ID passed to the route
    .put(function (req, res) {
        App.findById(req.params.app_id, function (err, app) {
            if (err)
                res.send(err);
            //setting the new author and text to whatever was changed. If nothing was changed
            // we will not alter the field.
            (req.body.author) ? app.author = req.body.author : null;
            (req.body.text) ? app.text = req.body.text : null;
            //save app
            app.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: 'App has been updated' });
            });
        });
    })
    //delete method for removing a app from our database
    .delete(function (req, res) {
        //selects the app by its ID, then removes it.
        App.remove({ _id: req.params.app_id }, function (err, app) {
            if (err)
                res.send(err);
            res.json({ message: 'App has been deleted' })
        })
    });    

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function () {
    console.log(`api running on port ${port}`);
});