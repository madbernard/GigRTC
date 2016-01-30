var db = require('../config');
var Tag = require('./tag');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  defaults: {
    banned_until: '1000-01-01', // earliest allowable MySQL date
    harassed: false,
    over17: true,
    admin: false
  },
  tags: function() {
    return this.hasMany(Tag);
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      // var shasum = crypto.createHash('sha1');
      // shasum.update(model.get('url'));
      // model.set('code', shasum.digest('hex').slice(0, 5));
    }).catch(function(error) { // I added this, it may not be relevantly placed
      console.error('Error in user model creation: ', error);
    });
  }
});

module.exports = User;

// users.increments('id').primary();
// users.timestamps();  // Adds a created_at and updated_at column on the database, setting these each to dateTime types.
// users.string('oauth_id', 255); // what google.plus will hopefully give us
// users.string('username', 255);
// users.text('artist_info'); // maximum length is 64 K
// users.specificType('userimage', 'mediumblob'); // mediumblob is for binaries up to 16 M
// users.date('banned_until'); // YYYY-MM-DD
// users.boolean('harassed'); // is this user the target of a troll campaign
// users.boolean('over17');
// users.boolean('admin');
