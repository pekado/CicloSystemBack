const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');

//crear servidor
const app = express();
//conectar db
connectDB();

app.use(cors())

//habilitar express.json
app.use(express.json({ extended: true }));
//puerto de la app
const port = process.env.PORT || 4000;

//importar rutas
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/works", require("./routes/works"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/clients", require("./routes/clients"));
app.use("/api/email", require("./routes/email"));
app.use("/api/reminders", require("./routes/reminders"));


//arrancar servidior
app.listen(port, '0.0.0.0', () => {
  console.log(`El servidor está vivo en el puerto ${port}`);
});
