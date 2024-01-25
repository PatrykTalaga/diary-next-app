import { Schema, model, models } from "mongoose";

const editedMemoModelSchema = new Schema({
  commonId: String,
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
});

const EditedMemoModel =
  models.EditedMemoModel || model("EditedMemoModel", editedMemoModelSchema);

export default EditedMemoModel;
