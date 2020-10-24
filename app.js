const express = require('express')
var exphbs  = require('express-handlebars');
const app = express()
const port = 3000
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
// app.listen('/');
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})