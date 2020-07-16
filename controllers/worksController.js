const Work = require("../models/Work");
const Tasks = require("../models/Task");
const { validationResult } = require("express-validator");

exports.createWork = async (req, res) => {
  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  try {
    console.log(req.body);
    //crear nuevo proyecto
    const work = new Work(req.body);
    //guardar proyecto
    work.save();
    res.json(work);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};

// obtiene todos los trabajos del usuario actual

exports.getWorks = async (req, res) => {
  try {
    const workAndClient = await Work.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "cliente",
          foreignField: "_id",
          as: "Client"
        }
      },
      { $unwind: "$Client" }
    ]).sort({"entrega": 1 });
    res.json({ workAndClient });
  } catch (error) {
    console.log(error);
    res.status(500).send("error found");
  }
};

//actualizar trabajo

exports.updateWork = async (req, res) => {
  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  //extraer info del proyecto
  const { state } = req.body;
  const newWork = {};

  newWork.state = state;

  try {
    //revisar el id
    let work = await Work.findById(req.params.id);
    //si el proyecto existe
    if (!work) {
      return res.status(404).json({ msg: "work not found" });
    }
    // //verificar el creador
    // if(work.creator.toString() !== req.user.id){
    //     return res.statur(401).json({msg: "no authorization"})
    // }
    //actualizar
    work = await Work.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newWork },
      { new: true }
    );

    res.json({ work });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};
//elimina proyecto por id
exports.deleteWork = async (req, res) => {
  try {
    //revisar el id
    let work = await Work.findById(req.params.id);
    //si el proyecto existe
    if (!work) {
      return res.status(404).json({ msg: "work not found" });
    }
    // //verificar el creador
    // if(work.creator.toString() !== req.user.id){
    //     return res.statur(401).json({msg: "no authorization"})
    // }
    //eliminar proyecto
    await Work.findOneAndRemove({ _id: req.params.id });
    await Tasks.deleteMany({ project: req.params.id });

    res.json({ msg: "work deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error" });
  }
};
