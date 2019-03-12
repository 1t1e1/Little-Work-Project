var express = require('express');
var path = require("path");
var app = express();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/Lamps', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var LampSchema = new Schema({
  number:  {
    type: Number,
    required: true,
    unique: true
  },
  status: {
    type: Boolean,
    required: true,
  }
});
// Create model of Lamp
var Lamp = mongoose.model('Lamp', LampSchema);



app.set('view engine', 'ejs');
// app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.static(path.join(__dirname,'/public')))
 
app.get('/', function(req, res) {
  Lamp.find(function (err, Lamps) {
    if (err) return console.error(err);
    Lamps.sort(function(a,b){
      return a.number - b.number
    })
    // this Lamps is array and contain all information 
    res.render('pages/indexdb',{ arrayValued : Lamps});
  })
});

// change page 
app.get('/change/:id', function(req, res) {
    let id = Number( req.params.id)
    // console.log( typeof id)
    // console.log( id)
    Lamp.findOne({number:id},(err,Lamps)=>{
      if (err) return console.log("Something wrong when updating data!");
      // console.log(Lamps.status)
      Lamps.status = !Lamps.status
      // console.log(Lamps.status)
      // console.log(typeof Lamps)
      // console.log(Lamps)
      Lamps.save(function (err){
        if (err) return console.log("Something wrong when saving data!")
      })
      // .then((err) => console.log(typeof err));
      res.redirect("/");
    })
    
    

});

app.listen(3000, function(){
  console.log('3000 is listening');
});