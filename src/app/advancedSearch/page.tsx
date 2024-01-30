import AdvancedSearchPage from "../components/AdvancedSearchPage";
import CompletedTasks from "../components/CompletedTasks";
import fetchCompletedTasks from "../functions/fetchCompletedTasks";
import { fetchAllMemos } from "../functions/memos";

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

export default async function AllCompletedTasks() {
  let dataMemo: DataMemoType = [];
  try {
    const memos = await fetchAllMemos();
    if (memos !== false) {
      //const {_id, ...dataMemo} = memos causes problems
      dataMemo = memos.map((memo) => {
        return {
          id: memo._id.toString(),
          title: memo.title,
          text: memo.text,
          img: memo.img,
          tags: memo.tags,
          createdAt: memo.createdAt,
          edited: memo.edited,
          editedAt: memo.editedAt,
        };
      });
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <AdvancedSearchPage data={dataMemo}></AdvancedSearchPage>
    </>
  );
}
