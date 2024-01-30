"use server";

import CompletedTask from "../../../models/completedTaskModel";
import Task from "../../../models/taskModel";
import connectMongo from "../../../utils/connectMongo";

//get data from database//

export default async function fetchTasks(limit: number) {
  try {
    await connectMongo();
    let tasks = await Task.find().limit(limit);
    //remove object id (_id), add id string
    const dataTask = tasks.map((task) => {
      return {
        id: task._id.toString(),
        title: task.title,
        text: task.text,
        createdAt: task.createdAt,
        completed: task.completed,
        completedAt: task.completedAt,
      };
    });
    //sort by creaction date
    dataTask.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return dataTask;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function fetchCompletedTasks() {
  try {
    await connectMongo();
    let tasks = await CompletedTask.find();
    tasks.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return tasks;
  } catch (err) {
    console.error(err);
    return false;
  }
}

//other functions (create, edit, delete)//

export async function addTask(title: string, text: string) {
  const date = new Date();

  try {
    await connectMongo();
    if (title == "" || text == "") return false;
    const newTask = {
      title: title,
      text: text,
      completed: false,
      createdAt: date,
      completedAt: date,
    };

    await Task.create(newTask);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function completeTask(id: string) {
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

export async function deleteTask(id: string) {
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
