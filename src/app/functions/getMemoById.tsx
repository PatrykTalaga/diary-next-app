"use server";

import connectMongo from "../../../utils/connectMongo";
import Memo from "../../../models/memoModel";

export default async function getMemoById(memoId: string) {
  try {
    await connectMongo();
    let memo = await Memo.findOne({ _id: memoId });
    if (memo === null) return "Book of this title does not exists";
    return memo;
  } catch (error) {
    console.error(error);
  }
}
