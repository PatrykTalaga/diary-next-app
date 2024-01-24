import Task from "../../../models/taskModel";
import connectMongo from "../../../utils/connectMongo";

export default async function fetchTasks(limit: number) {
  try {
    await connectMongo();
    let tasks = await Task.find().limit(limit);
    tasks.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return tasks;
  } catch (err) {
    console.error(err);
    return false;
  }
}
