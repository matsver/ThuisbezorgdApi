const express = require('express');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');

const {Code} = require('./../models/codes');

var app = express();
const port = process.env.PORT || 1337;
app.use(bodyParser.json({
  type: 'application/*+json'
}));

app.post('/codes', (req, res) => {
  var code = req.body.text;
  res.send(JSON.stringify(body, undefined, 2));
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});