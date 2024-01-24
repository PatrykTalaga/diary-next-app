import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  completed: Boolean,
  createdAt: Date,
  completedAt: Date,
});

const Task = models.Task || model("Task", taskSchema);

export default Task;
