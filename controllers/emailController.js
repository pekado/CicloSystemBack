var nodemailer = require("nodemailer");
require('dotenv').config({ path: 'variables.env' });
// email sender function
exports.sendEmail = function(req, res) {
  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "peka.salas@gmail.com",
      pass: process.env.EMAILPASS
    }
  });
  // Definimos el email
  var mailOptions = {
    from: "Benshi",
    to: "ceciliahuberman@gmail.com",
    subject: "teamo",
    text: "te amo musho"
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500, error.message);
    } else {
      console.log("Email sent");
      res.status(200).jsonp(req.body);
    }
  });
};
