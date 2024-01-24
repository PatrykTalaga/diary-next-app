import CompletedTask from "../../../models/completedTaskModel";
import connectMongo from "../../../utils/connectMongo";

export default async function fetchCompletedTasks() {
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
