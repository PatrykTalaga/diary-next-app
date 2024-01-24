import { Schema, model, models } from "mongoose";

const completedTaskSchema = new Schema({
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

const CompletedTask =
  models.CompletedTask || model("CompletedTask", completedTaskSchema);

export default CompletedTask;
