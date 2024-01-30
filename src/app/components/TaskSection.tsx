"use client";

import { useState } from "react";
import BtnStandard from "./BtnStandard";
import StandardLink from "./StandardLink";
import Task from "./Task";
import ModalAddTask from "./ModalAddTask";

type Props = {
  dataTask: Array<{
    id: string;
    title: string;
    text: string;
    createdAt: Date;
    completed: boolean;
    completedAt: Date;
  }>;
};

export default function TaskSection({ dataTask }: Props) {
  const [showModal, setShowModal] = useState(false); //add new task

  function clearTasks() {
    console.log(clearTasks);
    setShowModal(true);
  }

  return (
    <>
      <ModalAddTask
        showModal={showModal}
        closeForm={() => setShowModal(false)}
      />
      <section className="bg-stone-400 bg-opacity-70 border-t mt-auto">
        <div className="flex items-start justify-centers gap-2 p-2">
          <header className="text-2xl font-sans mr-2">Tasks</header>
          <BtnStandard onClick={clearTasks} label="Clear Completed" />
          <StandardLink link="/completedTasks" label="All Completed Tasks" />
          <BtnStandard
            onClick={() => setShowModal(true)}
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
    </>
  );
}
