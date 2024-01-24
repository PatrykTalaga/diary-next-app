"use server";

import connectMongo from "../../../utils/connectMongo";
import Task from "../../../models/taskModel";

export default async function completeTask(id: string) {
  try {
    await connectMongo();
    let task = await Task.findOne({ _id: id });
    if (task === null) return false;

    const date = new Date();

    task.completed = true;
    task.completedAt = date;

    const result = await task.save();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
