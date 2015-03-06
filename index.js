var express = require('express')
var app = express()

app.set('views', './views') 
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'})
})
 
app.listen(3000)