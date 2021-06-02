const express = require("express");
require("dotenv").config();
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/voice", (req, res) => {
  console.log("recieved voice call!");
  const twiml = new VoiceResponse();
  const dial = twiml.dial();
  const numbers = process.env.PHONE_NUMBERS.split(",");
  for (const number of numbers) {
    dial.number(number);
  }
  console.log(`Dial obj: ${dial}`);
  console.log(`twiml Obj: ${twiml.toString()}`);
  res.type("text/xml");
  res.send(twiml.toString());
  res.status(200);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
