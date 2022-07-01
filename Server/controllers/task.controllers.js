const moment = require("moment");
const { task } = require("../models/task.models");
var CurrentDate = moment();

module.exports.createtask = (req, res) => {
  const { title, category, due, priority, done } = req.body;
  task
    .create({
      title,
      category,
      due,
      priority,
      done
    })
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json(err));
};

module.exports.getAlltasks = (req, res) => {
  task
    .find()
    .sort({ priority: -1 })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => res.json(err));
};

module.exports.getDueTasks = (req, res) => {
  task
    .find({ due: CurrentDate })
    .then((tasks) => res.json(tasks)) //this is a the var that we can use
    .catch((err) => res.json(err));
};

module.exports.getLowTasks = (req, res) => {
  task
    .find({ priority: "1Low" })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
};

module.exports.getMediumTasks = (req, res) => {
  task
    .find({ priority: "2Medium" })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
};

module.exports.getHighTasks = (req, res) => {
  task
    .find({ priority: "3High" })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
};

module.exports.updategetDoneTask = (req, res) => {
  task
    .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedtask) => res.json(updatedtask))
    .catch((err) => res.json(err));
};

module.exports.getDoneTasks = (req, res) => {
  task
    .find({ done: true })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
};

module.exports.getNotDoneTasks = (req, res) => {
  task
    .find({ done: false })
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
};

module.exports.gettask = (req, res) => {
  task
    .findOne({ _id: req.params.id })
    .then((onetask) => res.json(onetask))
    .catch((err) => res.json(err));
};

module.exports.updatetask = (req, res) => {
  task
    .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedtask) => res.json(updatedtask))
    .catch((err) => res.json(err));
};

module.exports.deletetask = (req, res) => {
  task
    .deleteOne({ _id: req.params.id })
    .then((deleteConfirmation) => res.json(deleteConfirmation))
    .catch((err) => res.json(err));
};
