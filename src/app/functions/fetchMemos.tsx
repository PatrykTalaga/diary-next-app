import { Limelight } from "next/font/google";
import Memo from "../../../models/memoModel";
import connectMongo from "../../../utils/connectMongo";

export default async function fetchMemos(limit: number) {
  try {
    await connectMongo();
    let memos = await Memo.find().limit(limit);
    memos.sort(function (a, b) {
      return b.editedAt.getTime() - a.editedAt.getTime();
    });
    return memos;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/* try {
    await connectMongo();
    let memos = await Memo.find().skip(0).limit(3);
    memos.sort(function (a, b) {
      return b.editedAt.getTime() - a.editedAt.getTime();
    });
  } catch (err) {
    console.error(err);
    return false;
  }
}
 */
