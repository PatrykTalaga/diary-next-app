"use server";

import MemoViewOnly from "../components/MemoViewOnly";
import NavBarAlt from "../components/NavBarAlt";
import { getMemoById, getPreviousVersionsMemo } from "../functions/memos";

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
    //get previous versions by commonId
    const result = await getPreviousVersionsMemo(params.previousVersions[1]);
    if (result !== false) dataMemo = result;
    //add current verion at start
    const currentMemo = await getMemoById(params.previousVersions[1]);
    if (currentMemo !== false) dataMemo = [currentMemo, ...dataMemo];
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <div
        className="w-full min-h-screen bg-stone-500 flex flex-col
      justify-start"
      >
        <NavBarAlt />

        <section className="mt-4 mx-4">
          <ul
            className="flex flex-col gap-2 items-center justify-start
            sm:grid sm:grid-cols-3 sm:gap-4 sm:mx-2"
          >
            {dataMemo.map((data) => (
              <li key={data.id}>
                <MemoViewOnly data={data} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
