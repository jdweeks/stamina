const express = require('express');
const router = express.Router();
const mailer = require('nodemailer');
const transport = mailer.createTransport();

router.post('/', function(req, res) {
  transport.sendMail({
    from: req.body.email,
    to: 'jdweeks@g.clemson.edu',
    subject: 'Stamina: ' + req.body.reason,
    text: req.body.msg
  }, 
  function(err, info) {
    if (err) {
      res.status(400);
      res.send(err);
      return console.error(err);
    }   

    res.status(200);
    res.send(info);
  });
});

module.exports = router;
