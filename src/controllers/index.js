var config = require('../config');
var querystring = require('querystring');
var uuid = require('node-uuid');

module.exports = function(req, res) {
	var loginUrl = 'https://github.com/login/oauth/authorize?';
	loginUrl += querystring.stringify({
		'client_id': config['github-client-id'],
		'redirect_uri': config['github-redirect-uri'],
		'scope': config['github-scopes'].join(','),
		'state': uuid.v4()
	});

	res.render('pages/index', {
		title: 'Daily Code Challenge',
		challenge: {
			title: 'Code a game where you can jump over incomming bricks, in the browser URI.',
			repository: 'https://github.com/DailyCodeChallenge/challenge-1'
		},
		loginUrl: loginUrl
	});
};