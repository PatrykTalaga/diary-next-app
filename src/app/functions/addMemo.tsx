"use server";

import connectMongo from "../../../utils/connectMongo";
import Memo from "../../../models/memoModel";
/* import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options"; */

export default async function addMemo(
  title: string,
  text: string,
  tags: string
) {
  /* const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  } */

  const date = new Date();

  try {
    await connectMongo();
    if (title == "" || text == "") return false;

    let tagsArr: Array<string> = [];
    if (tags !== "") tagsArr = tags.split(" ");

    const newMemo = {
      title: title,
      text: text,
      img: "",
      tags: tagsArr,
      edited: false,
      createdAt: date,
      editedAt: date,
    };

    const savedMemo: { _id: string } = await Memo.create(newMemo);
    return savedMemo._id.toString(); //it is object id
  } catch (error) {
    console.error(error);
    return false;
  }
}
