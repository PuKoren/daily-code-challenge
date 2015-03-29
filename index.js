var express = require('express'),
  compression = require('compression'),
  app = express(),
  config = require('./src/config'),
  raven = require('raven'),
  ravenClient = new raven.Client('https://' + config.sentryApiKey + '@app.getsentry.com/40699'),
  session = require('express-session'),
  RedisStore = require('connect-redis')(session);

ravenClient.patchGlobal();

app.use(session({
  store: new RedisStore(config.redisOptions),
  secret: 'OJpONFAPNpnNFAPpoFA',
  resave: false,
  saveUninitialized: true
}));

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', require('./src/controllers/index.js'));
app.get('/join-the-fun', require('./src/controllers/participate.js').get());
app.use('/login/oauth/callback', require('./src/middlewares/oauth-callback.js'));

app.use(compression());
app.use(express.static(__dirname + '/assets'));

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");