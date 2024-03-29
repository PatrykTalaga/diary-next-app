"use server";

import NavBarAlt from "../components/NavBarAlt";

import SearchMemosDeleted from "../components/SearchMemosDeleted";
import { fetchDeletedMemos } from "../functions/memos";

type DataMemoType = Array<{
  id: string;
  oldId: string;
  title: string;
  text: string;
  img: string;
  tags: Array<string>;
  createdAt: Date;
  edited: boolean;
  editedAt: Date;
  deletedAt: Date;
}>;

export default async function DeletedMemos() {
  let dataMemo: DataMemoType = [];
  try {
    const memos = await fetchDeletedMemos();
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
        <SearchMemosDeleted data={dataMemo} />
      </div>
    </>
  );
}
