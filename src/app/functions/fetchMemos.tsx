import Memo from "../../../models/memoModel";
import connectMongo from "../../../utils/connectMongo";

export default async function fetchMemos(limit: number) {
  try {
    await connectMongo();
    let memos = await Memo.find().limit(limit);
    memos.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return memos;
  } catch (err) {
    console.error(err);
    return false;
  }
}
