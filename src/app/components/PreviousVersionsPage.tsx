"use client";

import NavBarAlt from "./NavBarAlt";
import MemoViewOnly from "./MemoViewOnly";

type Props = {
  data: Array<{
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

export default function PreviousVersionsPage({ data }: Props) {
  return (
    <div
      className="w-full min-h-screen bg-stone-500 flex flex-col
      justify-start"
    >
      <NavBarAlt />

      <section className="mt-4 mx-4">
        <ul
          className="flex flex-col gap-2 
          sm:grid sm:grid-cols-4 sm:gap-5 sm:px-5"
        >
          {data.map((data) => (
            <li key={data.id}>
              <MemoViewOnly data={data} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
