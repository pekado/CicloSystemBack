const Task = require("../models/Task");
const Work = require("../models/Work");
const Client = require("../models/Clients");
const { validationResult } = require("express-validator");

//crea una tarea
exports.createTask = async (req, res) => {
  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  //extraer el tranajo y comprobar si existe
  const { work } = req.body;
  try {
    const currentWork = await Work.findById(work);
    if (!currentWork) {
      res.status(404).json({ msg: "Work not found" });
    }
      await Task.insertMany(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error" });
  }
};
//obtiene tareas por proyectos
exports.getTasks = async (req, res) => {
  console.log(req.query);
  //extraemos el proyecto
  try {
    const { work } = req.query;
    const currentWork = await Work.findById(work);

    const currentClient = await Client.findById(currentWork.cliente);
    console.log(currentClient);
    if (!currentWork) {
      res.status(404).json({ msg: "work not found" });
    }
    // //revisar si el tranajo es del usuario
    // if (currentWork.creator.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "no authorization" });
    // }
    // obtener tareas por proyectos
    const tasks = await Task.find({ work }).sort({ creator: -1 });
    res.json({ tasks, currentClient });
  } catch (error) {
    console.log(error);
    res.status(500).send("sever error");
  }
};
//actualiza tareas
exports.updateTask = async (req, res) => {
  try {
    const { work, name, state, price } = req.body;
    //si la tarea existe
    let currentTask = await Task.findById(req.params.id);
    if (!currentTask) {
      return res.status(404).json({ msg: "task doesn´t exist" });
    }
    //crear objeto con nueva info
    const newTask = {};
    newTask.name = name;
    newTask.state = state;
    newTask.price = price;
    //guardar tarea
    currentTask = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true
    });
    res.json({ currentTask });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

//elimina tarea
exports.deleteTask = async (req, res) => {
  try {
    //si la tarea existe

    let currentTask = await Task.findById(req.params.id);
    if (!currentTask) {
      return res.status(404).json({ msg: "task doesn´t exist" });
    }
    //eliminar
    await Task.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "deleted task" });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};
