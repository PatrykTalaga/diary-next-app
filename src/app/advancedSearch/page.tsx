"use server";

import NavBarAlt from "../components/NavBarAlt";
import { fetchAllMemos } from "../functions/memos";
import SearchMemos from "../components/SearchMemos";

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

export default async function AllCompletedTasks() {
  let dataMemo: DataMemoType = [];
  try {
    const memos = await fetchAllMemos();
    if (memos !== false) dataMemo = memos;
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
        <SearchMemos data={dataMemo} />
      </div>
    </>
  );
}
