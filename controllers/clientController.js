const Client = require("../models/Clients");
const { validationResult } = require("express-validator");

exports.createClient = (req, res) => {
  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  try {
    //crear nuevo proyecto
    const client = new Client(req.body);
    //guardar proyecto
    client.save();
    res.json(client);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};

// obtiene todos los proyectos del usuario actual

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json({ clients });
  } catch (error) {
    console.log(error);
    res.status(500).send("error found");
  }
};

//actualizar proyecto

exports.updateClient = async (req, res) => {
  try {
    console.log(req.body)
    const { name, bike, phone, email } = req.body;
    //si la tarea existe
    let currentClient = await Client.findById(req.params.id);
    if (!currentClient) {
      return res.status(404).json({ msg: "task doesn´t exist" });
    }

 
    //crear objeto con nueva info
    const newClient = {};
    newClient.name = name;
    newClient.bike = bike;
    newClient.phone = phone;
    newClient.email = email;
    //guardar tarea
    currentClient = await Client.findOneAndUpdate({ _id: req.params.id }, newClient, {
      new: true
    });
    res.json({ currentClient });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};
//elimina proyecto por id
exports.deleteClient = async (req, res) => {
    try {
         //revisar el id
    let client = await Client.findById(req.params.id);
    //si el proyecto existe
    if(!client){
        return res.status(404).json({msg: "client not found"})
    }
    
    //eliminar proyecto
    await Client.findOneAndRemove({_id: req.params.id});
    res.json({msg: "Work deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: "server error"})
    }
}
