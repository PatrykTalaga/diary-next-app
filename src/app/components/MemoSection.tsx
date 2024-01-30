"use client";

import { useState } from "react";
import BtnStandard from "./BtnStandard";
import Memo from "./Memo";
import ModalAddMemo from "./ModalAddMemo";

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

type Props = { dataMemo: DataMemoType };

export default function MemoSection({ dataMemo }: Props) {
  const [memosDisp, setMemosDisp] = useState(3);
  const [showModal, setShowModal] = useState(false); //add Memo

  function loadMoreMemos() {
    setMemosDisp(memosDisp + 3);
  }

  return (
    <>
      <ModalAddMemo
        showModal={showModal}
        closeForm={() => setShowModal(false)}
      />

      <div className="mx-auto my-2 sm:my-4">
        <BtnStandard
          onClick={() => setShowModal(true)}
          label="Add New"
          tailwind="text-xl"
        />
      </div>

      <ul
        className="flex flex-col gap-2 items-center justify-start
        sm:grid sm:grid-cols-3 sm:gap-2 sm:mx-2 "
      >
        {dataMemo.slice(0, memosDisp).map((data) => (
          <li key={data.id}>
            <Memo data={data} />
          </li>
        ))}
      </ul>

      <div className="mx-auto my-2 sm:my-4 ">
        <BtnStandard
          onClick={loadMoreMemos}
          label="Load More"
          tailwind="text-xl"
        />
      </div>
    </>
  );
}
