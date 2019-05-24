
const Promise = require('bluebird');
const twitter = require('./twitter');
const commaSeries = require('./utils').commaSeries;
const sendNotification = require('./notification').send;
var fs = require("fs");
const _ = require("lodash");

Promise.all([
  followers = twitter.fetchFollowers()
])
  .then(([followers]) => {
    if (!followers) {
      // usually rate limiting
      console.log('Error fetching followers:');

      return;
    }

    var number = (`${followers.length},`);
    var data = followers;
    allData = number + data;
 
    var contents = fs.readFileSync(__dirname + "/followers.txt", "utf-8").toString().split(",");
    var fcontents = contents.shift();
    fs.writeFile(__dirname + "/followers.txt", allData, (err) => {
      if (err) console.log(err);
      console.log("Successfully written to file.");
  });

    const unfollowerID = _.difference(contents, followers);

    //console.log(_.difference(contents, followers));
    //console.log(followers.length);
    
if (unfollowerID.length) {
    const first = unfollowerID.slice(0, 100);
    return twitter
        .lookup(first)
        .then(unfollowers => {
            const screenNamesStr = commaSeries(
              unfollowers.map(u => `${u.name} (@${u.screen_name})`)
        );
            console.log(`${screenNamesStr} unfollowed you.`);
            sendNotification(`${screenNamesStr} unfollowed you. What a twat!`);
        })
      }})

    //console.log(`${screenNamesStr} unfollowed you.`);
