import { Schema, model, models } from "mongoose";

const memoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  img: String,
  edited: Boolean,
  createdAt: Date,
  editedAt: Date,
});

const Memo = models.Memo || model("Memo", memoSchema);

export default Memo;
