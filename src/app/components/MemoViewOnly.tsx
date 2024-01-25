"use client";

import convertDate from "../functions/convertDate";
import BtnStandard from "./BtnStandard";

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

export default function MemoViewOnly({ data }: Props) {
  function printMemo() {
    console.log("print");
  }

  return (
    <div
      className="flex flex-col justify-center items-start px-5 mx-5 py-2
    border rounded-lg bg-stone-400 bg-opacity-70 h-full"
    >
      <section className=" flex justify-start items-end">
        <header className="text-xl text-neutral-100">
          {data.title + ", "}
        </header>
        <p className=" text-lg text-neutral-100 ml-2">
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
        <BtnStandard onClick={printMemo} label="Print" />
      </section>
    </div>
  );
}
