var express = require('express');
var path = require("path");
var app = express();

app.set('view engine', 'ejs');
// app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.static(path.join(__dirname,'/public')))

app.get('/', function(req, res) {
    res.render('pages/index');
});

// // about page 
// app.get('/about', function(req, res) {
//     res.render('pages/about');
// });

app.listen(3000, function(){
  console.log('3000 is listening');
});