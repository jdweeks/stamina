var express = require('express');
var router = express.Router();
var mailer = require('nodemailer');
var transport = mailer.createTransport();

router.post('/', function(req, res) {
  transport.sendMail({
    from: req.body.email,
    to: 'jdweeks@g.clemson.edu',
    subject: 'Stamina: ' + req.body.reason,
    text: req.body.msg
  });
  res.status(200);
  res.send('Feedback submitted successfully');
});

module.exports = router;
