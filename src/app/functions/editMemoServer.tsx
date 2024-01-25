"use server";

import Memo from "../../../models/memoModel";
import EditedMemoModel from "../../../models/editedMemoModel";
import connectMongo from "../../../utils/connectMongo";
import RemovedMemo from "../../../models/removedMemoModel";
import PreviousVersions from "../previousVersions/page";

/* import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options"; */

export default async function editMemoServer(
  id: string,
  title: string,
  text: string,
  tags: string,
  img: string
) {
  /* const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  } */
  const date = new Date();

  try {
    await connectMongo();

    const memo = await Memo.findOne({ _id: id });
    if (memo === null) return;

    if (title == "" || text == "") return false;

    let tagsArr: Array<string> = [];
    if (tags !== "") tagsArr = tags.split(" ");

    const previousVerion = {
      commonId: id,
      title: memo.title,
      text: memo.text,
      img: memo.img,
      tags: memo.tags,
      edited: true,
      createdAt: memo.createdAt,
      editedAt: memo.editedAt,
      deletedAt: date,
    };

    memo.title = title;
    memo.text = text;
    memo.img = img;
    memo.tags = tags;
    memo.edited = true;
    memo.editedAt = date;

    await memo.save();
    await EditedMemoModel.create(previousVerion);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}
