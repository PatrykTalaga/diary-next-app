import { Schema, model, models } from "mongoose";

const previousMemoSchema = new Schema({
  commonId: String,
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

const PreviousMemo =
  models.PreviousMemo || model("PreviousMemo", previousMemoSchema);

export default PreviousMemo;
