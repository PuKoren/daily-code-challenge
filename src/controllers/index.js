module.exports = function(req, res) {
	res.render('pages/index', {
		title: 'Daily Code Challenge',
		challenge: {
			title: 'Code a game where you can jump over incomming bricks, in the browser URI.',
			repository: 'https://github.com/DailyCodeChallenge/challenge-1'
		}
	});
};