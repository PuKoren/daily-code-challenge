var express = require('express'),
  compression = require('compression'),
  app = express();

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

app.use(session({
    store: new RedisStore(require('./src/config').redisOptions),
    secret: 'OJpONFAPNpnNFAPpoFA'
}));

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', require('./src/controllers/index.js'));
app.get('/join-the-fun', require('./src/controllers/participate.js').get());
app.use('/login/oauth/callback', require('./src/middlewares/oauth-callback.js'));

app.use(compression());
app.use(express.static(__dirname + '/assets'));

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");