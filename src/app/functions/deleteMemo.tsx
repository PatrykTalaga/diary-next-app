"use server";

import Memo from "../../../models/memoModel";
import connectMongo from "../../../utils/connectMongo";
import RemovedMemo from "../../../models/removedMemoModel";

/* import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options"; */

export default async function deleteMemo(id: string) {
  /* const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  } */
  const date = new Date();

  try {
    await connectMongo();

    const memo = await Memo.findOne({ _id: id });
    if (memo === null) return;

    const newMemo = {
      title: memo.title,
      text: memo.text,
      img: memo.img,
      tags: memo.tags,
      edited: true,
      createdAt: memo.createdAt,
      editedAt: memo.editedAt,
      deletedAt: date,
    };

    const result = await Memo.deleteOne({ _id: id });
    if (result.acknowledged !== true) return false;

    await RemovedMemo.create(newMemo);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}
