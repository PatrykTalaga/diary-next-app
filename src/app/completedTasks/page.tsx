import CompletedTasks from "../components/CompletedTasks";
import fetchCompletedTasks from "../functions/fetchCompletedTasks";

type DataTaskType = Array<{
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  completed: boolean;
  completedAt: Date;
}>;

export default async function AllCompletedTasks() {
  let dataTask: DataTaskType = [];
  try {
    const tasks = await fetchCompletedTasks();
    if (tasks !== false) {
      //const {_id, ...dataTask} = tasks causes problems
      dataTask = tasks.map((task) => {
        return {
          id: task._id.toString(),
          title: task.title,
          text: task.text,
          createdAt: task.createdAt,
          completed: task.completed,
          completedAt: task.completedAt,
        };
      });
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <CompletedTasks data={dataTask}></CompletedTasks>
    </>
  );
}
