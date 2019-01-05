const express = require('express');
const bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Code} = require('./../models/codes');
const _ = require('lodash');

var app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.json());

app.post('/codes', (req, res) => {
  var code = new Code({
    text: req.body.text
  });

  code.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/codes', (req, res) => {
  Code.find().then((codes) => {
    res.send({codes});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/codes/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Code.findById(id).then((code) => {
    if (!code) {
      return res.status(404).send();
    }

    res.send({
      code
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/codes/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Code.findByIdAndRemove(id).then((code) => {
    if (!code) {
      return res.status(404).send();
    }
    res.send(code);
  }).catch((e) => res.status(400).send());
});

app.patch('/codes/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'used']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.used) && body.used) {
    body.usedAt = new Date().getTime();
  } else {
    body.used = false;
    body.usedAt = null;
  }

  Code.findOneAndUpdate(id, {
    $set: body
  }, {
    new: true
  }).then((code) => {
    if (!code) {
      return res.status(404).send();
    }

    res.send({
      code
    });
  }).catch((e) => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});