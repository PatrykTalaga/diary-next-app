import { Schema, model, models } from "mongoose";

const removedMemoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  edited: Boolean,
  createdAt: Date,
  editedAt: Date,
  deletedAt: Date,
});

const RemovedMemo =
  models.RemovedMemo || model("RemovedMemo", removedMemoSchema);

export default RemovedMemo;
