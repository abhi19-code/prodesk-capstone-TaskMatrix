const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "To Do"
  },

  priority: {
    type: String,
    default: "Medium"
  },

  assignedMember: {
    type: String,
    default: ""
  },

  dueDate: {
    type: String,
    default: ""
  },
  category: {
  type: String,
  default: ""
},

aiSummary: {
  type: String,
  default: ""
},

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Task", taskSchema);