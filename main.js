const acctSid = 'ACa06b90b0b052386d0493842a41023491';
const authToken = 'a70ee2f50a025618ca2b7abd11622402';
const client = require('twilio')(acctSid, authToken);

var whatSend = document.getElementById("messageSend").value;
var mediaSend;
var receiverNumber = document.getElementById("receiverNumber").value;

function sendMessage() {
  
  client.messages
    .create({
      body: '+1'whatSend,
      to: receiverNumber,
      from: "+18316099815"
      mediaUrl: mediaSend
    })
  .then(message => process.stdout.write(message.sid));
}

function checkEmpty {
  if (document.getElementById("receiverNumber1").value == "") {
    prompt("Please put a number you want to send the message to!")
  } else if (document.getElementBy("whatSend").value == "") {
    prompt("Please put a message to send!")
  }

}
