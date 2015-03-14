var express = require('express'),
  compression = require('compression'),
  app = express();


app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', require('./src/controllers/index.js'));

app.use(compression());
app.use(express.static(__dirname + '/assets'));

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");