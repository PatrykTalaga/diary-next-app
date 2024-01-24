"use client";

import convertDate from "../functions/convertDate";

type Props = {
  data: {
    id: string;
    title: string;
    text: string;
    createdAt: Date;
    completed: boolean;
    completedAt: Date;
  };
};

export default function TaskCompleted({ data }: Props) {
  return (
    <>
      <div
        className="flex flex-col justify-start items-center p-2 border
    rounded-lg bg-stone-300 bg-opacity-70 h-full"
      >
        <header className="text-xl text-white">{data.title}</header>
        <p className="text-sm mb-2">{data.text}</p>
        <p className="text-sm ">{`Created: ${convertDate(data.createdAt)}`}</p>
        <p className="text-sm">
          {`Completed: ${convertDate(data.completedAt)}`}
        </p>
      </div>
    </>
  );
}
