"use server";

import NavBarAlt from "../components/NavBarAlt";
import SearchCompletedTasks from "../components/SearchCompletedTasks";
import fetchTasks, {
  fetchAllTasks,
  fetchCompletedTasks,
} from "../functions/tasks";

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
    //completed and deleted tasks
    const tasks = await fetchCompletedTasks();
    if (tasks !== false) dataTask = tasks;
    //completed and not deleted tasks
    let notDeletedYet = await fetchAllTasks();
    if (notDeletedYet == false) return;
    notDeletedYet = notDeletedYet.filter((task) => task.completed == true);
    //combine both and sort them
    dataTask = [...notDeletedYet, ...dataTask];
    dataTask.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <div
        className="w-full min-h-screen bg-stone-500 flex flex-col
      justify-start"
      >
        <NavBarAlt />
        <SearchCompletedTasks data={dataTask} />
      </div>
    </>
  );
}
