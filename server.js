var path = require('path');
var url = require('url');
var express = require('express');
var fs    = require('fs');
var https = require('https');
var http = require('http');
var path = require('path');

var CONFIG = require('./config.js');

var favicon = require('serve-favicon');

var db = require('./db/config');
var Users = require('./db/collections/users');
var User = require('./db/models/user');
var Tags = require('./db/collections/tags');
var Tag = require('./db/models/tag');
var Performances = require('./db/collections/performances');
var Performance = require('./db/models/performance');


var options = {
  key:  fs.readFileSync('keys/server.key'),
  cert: fs.readFileSync('keys/server.crt')
};

var app = express();

var port = 1338;

var server = https.createServer(options, app).listen(port, function() {
  console.log(`Running on port: ${port}`);
});



app.get('/api/activeStreams',
function(req, res) {
  Performances.fetch().then(function(performances) {
    res.status(200).send(performances.models);
  });
  // https://github.com/tgriesser/bookshelf/issues/629 possible issue with getting tags
  // res send in new then?  .attach(what in here)
  // Performance.fetchAll()
  // .then(function(performances) {
  //   return performances.each(function(performance) {
  //     return performance.load(['tags']); // look this up
  //   });
  // })
  // .then(function(performances) {
  //   performances.at(0).related('tags').attach(FTW); // waht in attach ()?
  // })
  // .then(function(performances) {
  //   res.send(200, performances.models); // ok to call models on fetchall result?
  // });
});

app.get('/test',
  function(req, res) {

    var testUser = new User({
      username: 'Jane Bond',
      admin: true
    });

    var testPerf = new Performance({
      title: 'Jimbo sings the blues',
      short_description: 'My blues are outta control',
      long_description: 'Love life\'s sweetest reward Let it flow it floats back to you. Boy the way Glen Miller played. Songs that made the hit parade. Guys like us we had it made. Those were the days. All of them had hair of gold like their mother the youngest one in curls.; In 1972 a crack commando unit was sent to prison by a military court for a crime they didn\'t commit. These men promptly escaped from a maximum security stockade to the Los Angeles underground. We\'re gonna do it. On your mark get set and go now. Got a dream and we just know now we\'re gonna make our dream come true. These days are all Happy and Free. These days are all share them with me oh baby. You wanna be where you can see our troubles are all the same. You wanna be where everybody knows Your name. Space. The final frontier. These are the voyages of the Starship Enterprise. Here\'s the story of a man named Brady who was busy with three boys of his own. Fleeing from the Cylon tyranny the last Battlestar – Galactica - leads a rag-tag fugitive fleet on a lonely quest - a shining planet known as Earth. Knight Rider: A shadowy flight into the dangerous world of a man who does not exist. It\'s time to put on makeup. It\'s time to dress up right. It\'s time to raise the curtain on the Muppet Show tonight. Its mission - to explore strange new worlds to seek out new life and new civilizations to boldly go where no man has gone before.'
    });

    var testTag = new Tag({
      tagname: 'doo wop'
    });

    testTag.save()
    .then(function(newTag) {
      Tags.add(newTag);
      res.status(200).send(newTag);
    })
    .catch(function(err) {
      console.error(err);
    });
  }
);




///////////////////////////////////////////////\


var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt')
var bodyParser = require('body-parser');
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

app.use(favicon(__dirname + '/client/public/img/spinner.gif'));


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

app.use(expressJWT({secret : CONFIG.JWT_SECRET}).unless({path : ['/',/^\/auth\/.*/,'/authenticateFacebook',/^\/api\/.*/]}));

app.post('/auth/getToken/', (req, res) => {
    if (req.body.userName == 'tds@tds.com' && req.body.password == 'tds') {
        var myToken = jwt.sign({userName:req.body.userName},CONFIG.JWT_SECRET)
        res.status(200)
            .json({token: myToken});
    } else {
        res.sendStatus(403);
    }
});

app.get('/getData/', (req, res) => {
    res.status(200)
        .json({data: 'Valid JWT found! This protected data was fetched from the server.'});

})
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
        clientID: CONFIG.FB_CLIENT_ID,
        clientSecret: CONFIG.FB_APP_SECRET,
        callbackURL: CONFIG.FB_CALL_BACK,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
        new User({facebook_id : profile.id}).fetch().then(function(response){
            if(response){
                return done(null,profile)
            }
            else{
                var facebookUser = new User({
                    facebook_id : profile.id,
                    email_id : profile.emails[0].value,
                    display_name : profile.displayName,
                    user_image : profile.photos[0].value
                })

                facebookUser.save().then(function(newfacebookUser) {
                    Users.add(newfacebookUser);
                    return done(null,newfacebookUser)
                });
            }
        })



        //User.findOrCreate(..., function(err, user) {
        //    if (err) { return done(err); }
        //    done(null, user);
        //});
        //return done(null,profile)
    }
));

app.use(passport.initialize());


app.get('/auth/facebook/',
    passport.authenticate('facebook',{scope : 'email'}));

var current_token;
var current_user;

app.get('/auth/facebook/callback/',

    passport.authenticate('facebook', { failureRedirect: '/login' }),

    function(req, res) {
        console.log("response",req.user);
        current_user = req.user
        current_token = jwt.sign({userName: req.user.emails[0].value },CONFIG.JWT_SECRET)
        res.redirect('/authenticateFacebook')
    }

);

app.get('/auth/validateSocialToken',(req, res) => {

    res.json({token: current_token, user_details : current_user});
})



app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})







module.exports.server = server;


