var nodemailer = require("nodemailer");
require('dotenv').config({ path: 'variables.env' });
// email sender function
exports.sendEmail = function(req, res) {
  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bc31455f0b58e6",
      pass: "9be4afda479590"
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
