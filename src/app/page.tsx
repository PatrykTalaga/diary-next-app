"use server";
import NavBarMain from "./components/NavBarMain";
import MemoSection from "./components/MemoSection";
import fetchMemos from "./functions/memos";
import fetchTasks from "./functions/tasks";
import TaskSection from "./components/TaskSection";

type DataMemoType = Array<{
  id: string;
  title: string;
  text: string;
  img: string;
  tags: Array<string>;
  createdAt: Date;
  edited: boolean;
  editedAt: Date;
}>;
type DataTaskType = Array<{
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  completed: boolean;
  completedAt: Date;
}>;

export default async function Home() {
  let dataMemo: DataMemoType = [];
  try {
    const result = await fetchMemos(100);
    //if data wasn't feched keep dataMemo empty
    if (result !== false) dataMemo = result;
  } catch (err) {
    console.error(err);
  }

  let dataTask: DataTaskType = [];
  try {
    const result = await fetchTasks(8);
    if (result !== false) dataTask = result;
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <div
        className="w-full min-h-screen bg-stone-500 flex flex-col
        justify-start"
      >
        <NavBarMain />
        <MemoSection dataMemo={dataMemo} />
        <TaskSection dataTask={dataTask} />
      </div>
    </>
  );
}
