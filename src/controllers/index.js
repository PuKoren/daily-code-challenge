var config = require('../config');
var uuid = require('node-uuid');

module.exports = function(req, res) {
	var loginUrl = 'https://github.com/login/oauth/authorize';
	loginUrl += '?client_id=' + config['github-client-id'];
	loginUrl += '&redirect_uri=' + config['github-redirect-uri'];
	loginUrl += '&scope=' + config['github-scopes'].join(',');
	loginUrl += '&state=' + uuid.v4();

	res.render('pages/index', {
		title: 'Daily Code Challenge',
		challenge: {
			title: 'Code a game where you can jump over incomming bricks, in the browser URI.',
			repository: 'https://github.com/DailyCodeChallenge/challenge-1'
		},
		loginUrl: loginUrl
	});
};