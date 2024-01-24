import { Schema, model, models } from "mongoose";

const deletedMemoSchema = new Schema({
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
});

const DeletedMemo =
  models.DeletedMemo || model("DeletedMemo", deletedMemoSchema);

export default DeletedMemo;
