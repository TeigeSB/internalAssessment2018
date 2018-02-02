const acctSid = 'ACa06b90b0b052386d0493842a41023491';
const authToken = 'a70ee2f50a025618ca2b7abd11622402';
const client = require('twilio')(acctSid, authToken);

var whatSend = document.getElementById("messageSend").value;
var mediaSend;
var receiverNumber = document.getElementById("receiverNumber").value;

client.messages
  .create({
    body: whatSend,
    to: receiverNumber,
    from: "+18316099815"
    mediaUrl: mediaSend
  })
  .then(message => process.stdout.write(message.sid));
