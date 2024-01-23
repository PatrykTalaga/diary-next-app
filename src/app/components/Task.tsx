"use client";

import BtnStandard from "./BtnStandard";

type Props = {
  data: {
    title: string;
    text: string;
    createdAt: Date;
    completed: boolean;
    completeddAt: Date;
  };
};

export default function Task({ data }: Props) {
  function completeTask() {
    console.log("completeTask");
  }

  function deleteTask() {
    console.log("deleteTask");
  }

  if (data.completed) {
    return (
      <div
        className="flex flex-col justify-start items-center p-2 border
      rounded-lg bg-stone-300 bg-opacity-70 h-full"
      >
        <header className="text-xl text-stone-500 line-through">
          {data.title}
        </header>
        <p className="line-through text-sm text-stone-500 mb-2">{data.text}</p>
        <BtnStandard
          onClick={deleteTask}
          label="Delete"
          tailwind="mx-auto mt-auto"
        />
      </div>
    );
  }
  return (
    <div
      className="flex flex-col justify-start items-center p-2 border
    rounded-lg bg-stone-300 bg-opacity-70 h-full"
    >
      <header className="text-xl text-white">{data.title}</header>
      <p className="text-sm mb-2">{data.text}</p>
      <BtnStandard
        onClick={completeTask}
        label="Complete"
        tailwind="mx-auto mt-auto"
      />
    </div>
  );
}
