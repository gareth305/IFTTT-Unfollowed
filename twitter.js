var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

module.exports = {
  fetchFollowers: () =>
    Twitter.get('followers/ids', { stringify_ids: true })
      .then(r => r.data.ids)
      .catch(err => console.log(err)),
  lookup: ids =>
    Twitter.get('users/lookup', { user_id: ids.join(',') }).then(r => r.data)
};