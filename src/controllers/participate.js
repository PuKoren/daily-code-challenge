module.exports = {
  get: function() {
    return function(req, res) {
      if (req.session.githubToken === undefined) {
        return res.redirect('/');
      }
      res.render('pages/participate', {
        title: 'Daily Code Challenge'
      });
    };
  },
  post: function() {
    return function(req, res) {
      res.redirect('/');
    };
  }
};