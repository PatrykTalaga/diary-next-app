"use server";

import { redirect } from "next/navigation";
import Memo from "../../../models/memoModel";
import connectMongo from "../../../utils/connectMongo";
import { join } from "path";
import fs from "fs";
/* import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options"; */

export default async function deleteMemo(id: string) {
  /* const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  } */

  try {
    await connectMongo();
    //check if book exists
    const memo = await Memo.findOne({ _id: id });
    if (memo === null) return;

    //delete book
    const result = await Memo.deleteOne({ _id: id });
    if (result.acknowledged !== true) return false;
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
  /* redirect("/"); */
}
