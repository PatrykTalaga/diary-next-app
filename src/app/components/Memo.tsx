"use client";
import { useState } from "react";
import convertDate from "../functions/convertDate";
import BtnStandard from "./BtnStandard";
import { useRouter } from "next/navigation";
import { deleteMemo } from "../functions/memos";
import ModalEditMemo from "./ModalEditMemo";
import StandardLink from "./StandardLink";

type Props = {
  data: {
    id: string;
    title: string;
    text: string;
    img: string;
    tags: Array<string>;
    createdAt: Date;
    edited: boolean;
    editedAt: Date;
  };
};

export default function Memo({ data }: Props) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  function printMemo() {
    console.log("print");
  }

  async function handleDelete() {
    await deleteMemo(data.id);
    router.refresh();
  }

  return (
    <div
      className="flex flex-col justify-center items-start px-5 mx-5 py-2
    border rounded-lg bg-stone-400 bg-opacity-70 h-full"
    >
      <ModalEditMemo
        showModal={showModal}
        closeForm={() => setShowModal(false)}
        data={data}
      />
      <section className=" flex justify-start items-end">
        <header className="text-xl font-bold">{data.title + ", "}</header>
        <p className=" text-lg  ml-2">
          {data.edited
            ? convertDate(data.editedAt)
            : convertDate(data.createdAt)}
        </p>
      </section>

      <section className="container">
        {data.img !== "" && (
          <img
            alt="memo image"
            src={`images/${data.img}`}
            className="max-h-56 max-w-80 float-left m-2"
          ></img>
        )}
        <p className="text-sm ml-2 py-1">{data.text}</p>
      </section>

      <section className="flex flex-col gap-2 py-1 text-sm">
        <p>Tags: {data.tags.map((tag) => tag + " ")}</p>
      </section>

      <section className="flex justify-center gap-2 w-full py-1">
        <StandardLink
          link={`/previousVersions/${data.id}`}
          label="Previous Versions"
          tailwind="sm:text-sm"
        />
        <BtnStandard onClick={printMemo} label="Print" tailwind="sm:text-sm" />
        <BtnStandard
          onClick={() => setShowModal(true)}
          label="Edit"
          tailwind="sm:text-sm"
        />
        <BtnStandard
          onClick={handleDelete}
          label="Delete"
          tailwind="sm:text-sm"
        />
      </section>
    </div>
  );
}
