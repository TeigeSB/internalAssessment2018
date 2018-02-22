console.log("May Node be with you");

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
var acctSid = 'ACa06b90b0b052386d0493842a41023491';
var authToken = 'a70ee2f50a025618ca2b7abd11622402';
var twilio = require('twilio');
var client = new twilio(acctSid, authToken);

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

function sendMessage(messageBody,recipient) {

  client.messages.create({
      body: messageBody,
      to: "1"+recipient,
      from: "+18316099815"
    })
  .then((message => console.log(message.sid)));
}

function checkEmpty(number, message) {
  if (number == null) {
    console.log("Please put a number you want to send the message to!")
  } else if (message == null) {
    console.log("Please put a message to send!")
  }

}

var db

MongoClient.connect('mongodb://teige:Berkeley1@ds121898.mlab.com:21898/internalassessment2018', (err,
  database) => {
  if(err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

function loadCollection(collection) {
  var collections = db.collection(collection).find()
  collections.toArray(function(err,
  result) {
    if (err) return console.log(err)
    console.log(result);
    return result;

})
}

app.get('/', (req, res) => {
  var contactLists = loadCollection('contactList')
  var inMessages = loadCollection('inMessage')
  console.log(inMessages)
  console.log(contactLists)

  res.render('index.ejs', {contactList: contactLists, inMessage: inMessages})

})

app.post('/postMessages', (req, res) => {
  console.log(req.body);
  db.collection('inMessage').save(req.body, (err, result) => {
    if (err) return console.log(err);
    sendMessage(req.body.textarea, req.body.clear);
    console.log('saved to database');
    res.redirect('/');

  })
})

app.post('/makeContact', (req, res) => {
  console.log(req.body);
  db.collection('contactList').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');

  })
})
