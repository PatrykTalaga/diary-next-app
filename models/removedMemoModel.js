import { Schema, model, models } from "mongoose";

const removedMemoSchema = new Schema({
  oldId: String,
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  img: String,
  tags: Array,
  edited: Boolean,
  createdAt: Date,
  editedAt: Date,
  deletedAt: Date,
});

const RemovedMemo =
  models.RemovedMemo || model("RemovedMemo", removedMemoSchema);

export default RemovedMemo;
