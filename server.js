console.log("May Node be with you");

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')



var db

MongoClient.connect('mongodb://teige:Berkeley1@ds133136.mlab.com:33136/computerscience', (err,
  database) => {
  if(err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find()
  db.collection('quotes').find().toArray(function(err,
  result) {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})

})
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');

  })
})
