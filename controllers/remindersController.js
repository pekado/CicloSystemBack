const Reminder = require("../models/Reminder");

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ _id: -1 });
    res.json({ reminders });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error" });
  }
};

exports.createReminder = async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    reminder.save();
    res.json(reminder);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error" });
  }
};

exports.updateReminder = async (req, res) => {
    console.log(req.params.id)
  try {
    let currentReminder = await Reminder.findById(req.params.id);
    if (!currentReminder) {
      return res.status(404).json({ msg: "reminder doesn´t exist" });
    }
    const NewReminder = {};
    NewReminder.body = req.body.body;

    currentReminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id },
      NewReminder,
      { new: true }
    );
    res.json({currentReminder})
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error" });
  }
};

exports.deleteReminder = async (req, res) => {
    try {
        let currentReminder = await Reminder.findById(req.params.id)
        if(!currentReminder) {
            return res.status(404).json({msg: "Reminder Doesn´t Exist"})
        }
        currentReminder = await Reminder.findOneAndRemove({_id : req.params.id})
        res.json({msg: "Reminder deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Server Error"})
    }
}