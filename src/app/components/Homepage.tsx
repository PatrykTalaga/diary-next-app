"use client";

import { useState } from "react";
import AddMemoModal from "./ModalAddMemo";
import BtnStandard from "./BtnStandard";
import Memo from "./Memo";
import StandardLink from "./StandardLink";
import Task from "./Task";
import NavBarMain from "./NavBarMain";
import AddTaskModal from "./ModalAddTask";
import { useRouter } from "next/navigation";

type Props = {
  dataMemo: DataMemoType;
  dataTask: Array<{
    id: string;
    title: string;
    text: string;
    createdAt: Date;
    completed: boolean;
    completedAt: Date;
  }>;
};

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

export default function Homepage({ dataMemo, dataTask }: Props) {
  const [memosDisp, setMemosDisp] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const router = useRouter();

  function loadMore() {
    setMemosDisp(memosDisp + 3);
  }

  function clearTasks() {
    console.log(clearTasks);
  }

  //loadMoreMemos();

  return (
    <>
      <div
        className="w-full min-h-screen bg-stone-500 flex flex-col
        justify-start"
      >
        <NavBarMain />
        <AddMemoModal
          showModal={showModal}
          closeForm={() => setShowModal(false)}
        />

        <AddTaskModal
          showModal={showTaskModal}
          closeForm={() => setShowTaskModal(false)}
        />

        <BtnStandard
          onClick={() => setShowModal(true)}
          label="Add New"
          tailwind=" mx-auto my-2 sm:my-4 text-xl"
        />

        <ul
          className="flex flex-col gap-2 items-center justify-start
        sm:grid sm:grid-cols-3 sm:gap-2 sm:mx-2 "
        >
          {dataMemo.slice(0, memosDisp).map((data) => (
            <li key={data.id}>
              <Memo data={data} />
            </li>
          ))}
        </ul>

        <BtnStandard
          onClick={loadMore}
          label="Load More"
          tailwind="mx-auto my-2 sm:my-4 text-xl"
        />

        <section className="bg-stone-400 bg-opacity-70 border-t mt-auto">
          <div className="flex items-start justify-centers gap-2 p-2">
            <header className="text-2xl font-sans mr-2">Tasks</header>
            <BtnStandard onClick={clearTasks} label="Clear Completed" />
            <StandardLink link="/completedTasks" label="All Completed Tasks" />
            <BtnStandard
              onClick={() => setShowTaskModal(true)}
              label="Add New Task"
            />
          </div>
          <ul
            className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-4 sm:gap-5
          sm:px-5"
          >
            {dataTask.map((data) => (
              <li key={data.id}>
                <Task data={data} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
