var config = require('../config');
var querystring = require('querystring');
var https = require('https');

var post_data = {
  'client_secret': config['github-client-secret'],
  'client_id': config['github-client-id'],
};

var post_options = {
  host: config['github-domain'],
  port: '443',
  path: config['github-oauth-path'],
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

module.exports = function(req, res, next) {
  if (req.query.code !== undefined) {
    //check if req.query.state contains the generated uuid of the login link
    if (req.session.githubState !== req.query.state) {
      return next(new Error('Bad token, please try again'));
    }
    
    post_data.code = req.query.code;
    var data = querystring.stringify(post_data);
    post_options.headers['Content-Length'] = data.length;

    var post_req = https.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        try {
          chunk = JSON.parse(chunk);
          if (chunk.error === undefined) {
            //store token
          }
          console.log(chunk);
        } catch (e) {
          console.log(e);
        }
      });
    });

    post_req.write(data);
    post_req.end();
  }

  next();
};