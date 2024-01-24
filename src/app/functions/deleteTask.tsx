"use server";

import connectMongo from "../../../utils/connectMongo";
import Task from "../../../models/taskModel";
import CompletedTask from "../../../models/completedTaskModel";

export default async function deleteTask(id: string) {
  const date = new Date();

  try {
    await connectMongo();
    let task = await Task.findOne({ _id: id });
    if (task === null) return false;

    let resultDel = await Task.findOneAndDelete({ _id: id });

    const newTask = {
      title: task.title,
      text: task.text,
      completed: true,
      createdAt: task.createdAt,
      completedAt: task.completedAt,
    };
    const resultSave = await CompletedTask.create(newTask);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
