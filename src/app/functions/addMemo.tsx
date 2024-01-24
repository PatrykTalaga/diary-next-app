"use server";

import connectMongo from "../../../utils/connectMongo";
import Memo from "../../../models/memoModel";
/* import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options"; */
import { redirect } from "next/navigation";

export default async function addMemo(title: string, text: string) {
  /* const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  } */

  const date = new Date();

  try {
    await connectMongo();

    if (title == "" || text == "") return false;

    const newMemo = {
      title: title,
      text: text,
      img: "", //if cover exists is saved later in submitCover function;
      //lack of this field will mess up server whenever it checks
      //path to img, it would return value undefined
      edited: false,
      createdAt: date,
      editedAt: date,
    };

    /* const result = await Book.create(myBook); */ //returns object
    const savedMemo: { _id: string } = await Memo.create(newMemo);
    return savedMemo._id.toString(); //it is object id
  } catch (error) {
    console.error(error);
    return false;
  }
}
