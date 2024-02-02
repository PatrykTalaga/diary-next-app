"use server";

import MemoList from "@/app/components/MemoList";
import NavBarAlt from "@/app/components/NavBarAlt";
import { searchMemo } from "@/app/functions/memos";

type Params = { params: { title: string } };

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
export default async function SearchPage({ params }: Params) {
  let dataMemo: DataMemoType = [];
  try {
    const memos = await searchMemo(params.title);
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
        <MemoList dataMemo={dataMemo} />
      </div>
    </>
  );
}
