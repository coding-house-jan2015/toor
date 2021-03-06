var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.get('/search/tweets', {q: 'chyldmedford', count: 200}, function(error, tweets, response) {
  if (!error) {
    tweets.statuses.forEach(function(tweet) {
      console.log(tweet.text);
    });
  }
});
