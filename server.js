var express = require('express');
var path = require("path");
var app = express();


app.set('view engine', 'ejs');
// app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.static(path.join(__dirname,'/public')))

var arrayValued = [2, 4 , 5, 6, 0 ];
app.get('/', function(req, res) {
    res.render('pages/index',{ arrayValued : arrayValued});
});

// // about page 
// app.get('/about', function(req, res) {
//     res.render('pages/about');
// });

app.listen(3000, function(){
  console.log('3000 is listening');
});