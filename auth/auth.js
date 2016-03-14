module.exports = {
	'twitterAuth': {
		'clientID': process.env.TWITTER_KEY,
		'clientSecret': process.env.TWITTER_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
	},
	'facebookAuth': {
		'clientID': process.env.FACEBOOK_ID,
		'clientSecret': process.env.FACEBOOK_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/facebook/callback'
	}
};