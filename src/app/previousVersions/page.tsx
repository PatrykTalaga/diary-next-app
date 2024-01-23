"use client";

import Memo from "../components/Memo";
import NavBarAlt from "../components/NavBarAlt";
import StandardLink from "../components/StandardLink";

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

export default function PreviousVersions() {
  return (
    <div
      className="w-full min-h-screen bg-stone-500 flex flex-col
    justify-start"
    >
      <NavBarAlt />

      <section className="mt-5">
        <ul
          className="flex flex-col gap-2 items-center justify-start
        sm:grid sm:grid-cols-3 sm:gap-2 sm:mx-2 "
        >
          {dataMemo.slice(0, 10).map((data) => (
            <li key={data.id}>
              <Memo data={data} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
