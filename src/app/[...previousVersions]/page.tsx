import EditedMemoModel from "../../../models/editedMemoModel";
import connectMongo from "../../../utils/connectMongo";
import PreviousVersionsPage from "../components/PreviousVersionsPage";

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

export default async function PreviousVersions({
  params,
}: {
  params: { previousVersions: Array<string> };
}) {
  let dataMemo: DataMemoType = [];
  try {
    await connectMongo();
    let memos = await EditedMemoModel.find({
      commonId: params.previousVersions[1],
    });

    memos.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

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
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <PreviousVersionsPage data={dataMemo}></PreviousVersionsPage>
    </>
  );
}
