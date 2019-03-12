/* 
*   You should run 'node data.js' once
*   this document create 10 lamps in db
*   their status are random.
*
*   There is the code that removes all data 
*/

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

var Lamp = mongoose.model('Lamp', LampSchema);


for (let index = 0; index < 10; index++) {
    let lamba = new Lamp({ number:index , status: ( Math.random()>=0.5) });
    lamba.save().then(() => console.log(index + ' is saved'));
}


// //Remove all data 
// Lamp.remove({}, function(err) { 
//      if (err) return console.error(err);
//      console.log('collection removed') 
//  });