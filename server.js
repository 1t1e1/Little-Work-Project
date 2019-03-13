var express = require('express');
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);


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
app.use(express.static(path.join(__dirname,'/public')))
 
app.get('/', function(req, res) {
  Lamp.find(function (err, Lamps) {
    if (err) return console.error(err);
    Lamps.sort(function(a,b){
      return a.number - b.number
    })
    // this Lamps is array and contain all information 
    res.render('pages/indexS',{ arrayValued : Lamps});
  })
});


io.on("connection", function(socket) {
  socket.on('button clicked', (clicked_button)=>{   
    var number = Number(clicked_button.id);
    Lamp.findOne({number:number},(err,TheLamp)=>{
      if (err) return console.log("Something wrong when updating data!");
      console.log(TheLamp);
      TheLamp.status = !TheLamp.status
      TheLamp.save(function (err){
        if (err) return console.log("Something wrong when saving data!")
      })
    })
  
  io.emit('button clicked', clicked_button);
  })
})
 
    
http.listen(3000, function(){
  console.log('listening on *:3000');
});




/* 
  npm nin mongodb diye package'i varmis. ben mongoose kullandim.
  ejs yerine baksa bir alternatifim var mi? 
  Rest API tam olarak anlamadim. Tiklamayi post request olarak mi almam gerekiyor.
    -> Public, klasor duzeni rest ile ilgili 
  ? Css auto kismina biraz daha bakmam lazim  
*/