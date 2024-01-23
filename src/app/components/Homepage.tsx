"use client";

import { useState } from "react";
import AddMemoModal from "./AddMemoModal";
import BtnStandard from "./BtnStandard";
import Memo from "./Memo";
import StandardLink from "./StandardLink";
import Task from "./Task";
import NavBarMain from "./NavBarMain";

const dataMemo = [
  {
    id: "12333232234213",
    title: "Title",
    text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
  nobis eius perferendis deserunt cum eaque exercitationem accusamus iure optio
  ducimus quod, nulla neque eos sed nostrum fuga architecto alias repellendus
  dolores esse. Distinctio aut expedita laudantium iure autem laborum quae
  doloribus animi nihil. Voluptate culpa autem, repellendus quos cumque optio.
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
  nobis eius perferendis deserunt cum eaque exercitationem accusamus iure optio
  ducimus quod, nulla neque eos sed nostrum fuga architecto alias repellendus
  dolores esse. Distinctio aut expedita laudantium iure autem laborum quae
  doloribus animi nihil. Voluptate culpa autem, repellendus quos cumque optio.
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
  nobis eius perferendis deserunt cum eaque exercitationem accusamus iure optio
  ducimus quod, nulla neque eos sed nostrum fuga architecto alias repellendus
  dolores esse. Distinctio aut expedita laudantium iure autem laborum quae
  doloribus animi nihil. Voluptate culpa autem, repellendus quos cumque optio.`,
    img: "bg-black.jpg",
    tags: [`tagOne, tagTwo, work, alf, don't, eat, the, cat`],
    createdAt: new Date(),
    edited: true,
    editedAt: new Date(),
  },
  {
    id: "12334213",
    title: "Title",
    text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
  nobis eius perferendis deserunt cum eaque exercitationem accusamus iure optio
  ducimus quod, nulla neque eos sed nostrum fuga architecto alias repellendus
  dolores esse. Distinctio aut expedita laudantium iure autem laborum quae
  doloribus animi nihil. Voluptate culpa autem, repellendus quos cumque optio.`,
    img: "bg-black.jpg",
    tags: [`tagOne, tagTwo, work, alf, don't, eat, the, cat`],
    createdAt: new Date(),
    edited: true,
    editedAt: new Date(),
  },
  {
    id: "123342132",
    title: "Title 2",
    text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
  nobis eius perferendis deserunt cum eaque exercitationem accusamus iure optio
  ducimus quod, nulla neque eos sed nostrum fuga architecto alias repellendus
  dolores esse. Distinctio aut expedita laudantium iure autem laborum quae
  doloribus animi nihil. Voluptate culpa autem, repellendus quos cumque optio.`,
    img: "",
    tags: [`tagOne, don't, eat, the, cat`],
    createdAt: new Date(),
    edited: false,
    editedAt: new Date(),
  },
  {
    id: "123374213",
    title: "Title 3",
    text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
  nobis eius perferendis deserunt cum eaque exercitationem accusamus iure.`,
    img: "bg-black.jpg",
    tags: [`tagOne, tagTwo, work, alf, don't, eat, the, cat`],
    createdAt: new Date(),
    edited: false,
    editedAt: new Date(),
  },
  {
    id: "12337421323",
    title: "Title 3",
    text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
  nobis eius perferendis deserunt cum eaque exercitationem accusamus iure.`,
    img: "bg-black.jpg",
    tags: [`tagOne, tagTwo, work, alf, don't, eat, the, cat`],
    createdAt: new Date(),
    edited: false,
    editedAt: new Date(),
  },
  {
    id: "12337334213",
    title: "Title 3",
    text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
  nobis eius perferendis deserunt cum eaque exercitationem accusamus iure.`,
    img: "bg-black.jpg",
    tags: [`tagOne, tagTwo, work, alf, don't, eat, the, cat`],
    createdAt: new Date(),
    edited: false,
    editedAt: new Date(),
  },
  {
    id: "123374212313",
    title: "Title 3",
    text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
  nobis eius perferendis deserunt cum eaque exercitationem accusamus iure.`,
    img: "bg-black.jpg",
    tags: [`tagOne, tagTwo, work, alf, don't, eat, the, cat`],
    createdAt: new Date(),
    edited: false,
    editedAt: new Date(),
  },
];

const dataTask = [
  {
    id: "123345213",
    title: "Title 1",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit!`,
    createdAt: new Date(),
    completed: false,
    completeddAt: new Date(),
  },
  {
    id: "1223344213",
    title: "Title 2",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit!
  Lorem ipsum dolor sit amet, consectetur adipisicing elit!`,
    createdAt: new Date(),
    completed: true,
    completeddAt: new Date(),
  },
  {
    id: "123113213",
    title: "Title 3",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit!`,
    createdAt: new Date(),
    completed: true,
    completeddAt: new Date(),
  },
  {
    id: "12336533",
    title: "Title 4",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit!
  Lorem ipsum dolor sit amet, consectetur adipisicing elit!
  Lorem ipsum dolor sit amet, consectetur adipisicing elit!`,
    createdAt: new Date(),
    completed: false,
    completeddAt: new Date(),
  },
];

export default function Homepage() {
  const [memosDisp, setMemosDisp] = useState(3);
  const [showModal, setShowModal] = useState(false);

  function loadMore() {
    setMemosDisp(memosDisp + 3);
  }

  function clearTasks() {
    console.log(clearTasks);
  }

  return (
    <>
      <div
        className="w-full min-h-screen bg-stone-500 flex flex-col
        justify-between"
      >
        <NavBarMain />
        <AddMemoModal
          showModal={showModal}
          closeForm={() => setShowModal(false)}
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
          tailwind="mx-auto my-2 text-xl"
        />

        <section className="bg-stone-400 bg-opacity-70 border-t">
          <div className="flex items-center gap-2 p-2">
            <header className="text-2xl text-neutral-100 mr-2">Tasks</header>
            <BtnStandard onClick={clearTasks} label="Clear Completed" />
            <StandardLink link="/completedTasks" label="View Completed Tasks" />
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
