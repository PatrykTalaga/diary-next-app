import Memo from "../../models/memoModel";
import connectMongo from "../../utils/connectMongo";
import Homepage from "./components/Homepage";
import fetchMemos from "./functions/fetchMemos";

/* const dataMemo = [
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
]; */

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

export default async function Home() {
  let dataMemo: DataMemoType = [];
  let noMemos = true;
  try {
    const memos = await fetchMemos(100);

    if (memos !== false) {
      dataMemo = memos.map((memo) => {
        return {
          id: memo._id.toString(),
          title: memo.title,
          text: memo.text,
          img: memo.img,
          tags: memo.tags,
          createdAt: memo.createdAt,
          edited: memo.edited,
          editedAt: memo.editedAt,
        };
      });
      noMemos = false;
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <Homepage dataMemo={dataMemo} dataTask={dataTask} />
    </>
  );
}
