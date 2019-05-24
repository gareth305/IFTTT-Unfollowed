# IFTTT-Unfollowed
A script which scrapes your twitter followers, compares the current followers to a list from the previous run, then notifies you of the unfollower via IFTTT. Followed by an insult for good measure!

Based off David Crespo's [Unfollowers](https://github.com/david-crespo/unfollowers), but modified to run without Heroku.

## How to setup

### Twitter

1. Go to https://developer.twitter.com/
2. Request your account be converted to a developer account (may take a couple of days...)
3. Go to https://developer.twitter.com/en/apps
4. Create an app with read permissions
5. Note the API keys and Access tokens

### IFTTT

1. Log into your account
2. Connect the webhooks service, note the URL `https://maker.ifttt.com/use/<IFTTT_KEY>`
3. Create a webhooks applet with an event `new_unfollowers` as its trigger and a notification as its effect. Set `{{Value1}}` as the contents of the notification.
4. Install the IFTTT app on your phone and log in. Make sure you give it permission to send you notifications.

## Running the script

1. Go through all the steps above
1. Install Node if you don't have it
1. Run `npm i` in the repo directory
1. Set all of the variables in config.js to the keys from earlier
1. Run `node index.js`. Output should look like this:

    ```
    $ node index.js
    Successfully written to file.
    ```
    That proves the connectionto Twitter is working.
1. Run `node test-notification.js`. Output should look like this

    ```
    $ node test-notification.js
    Posted to IFTTT: "This is a test notification!"
    ```
    and you should get a notification on your phone
### Scheduling the script
You can either follow the instructions below or use David's repo, hosting it with Heroku.

1. Using a raspberry pi, complete the steps above again.
1. Install screen
1. Start a screen session `screen`
1. Run `watch -n300 -x node <filepath to repo>/index.js`
1. Disconnect from screen session `Ctrl+a` followed by `d`

This will run the script every 5 minutes to check for unfollowers. By running it with screen, 
you can disconnect from SSH and leave the Pi to do its own thing.
