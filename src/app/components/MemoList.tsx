"use client";

import Memo from "./Memo";

type Props = {
  dataMemo: Array<{
    id: string;
    title: string;
    text: string;
    img: string;
    tags: Array<string>;
    createdAt: Date;
    edited: boolean;
    editedAt: Date;
  }>;
};

export default function MemoList({ dataMemo }: Props) {
  return (
    <>
      <section className="mt-4 mx-4">
        <ul
          className="flex flex-col gap-2 items-center justify-start
          sm:grid sm:grid-cols-3 sm:gap-2 sm:mx-4"
        >
          {dataMemo.map((data) => (
            <li key={data.id}>
              <Memo data={data} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
