"use client";

import completeTask from "../functions/completeTask";
import deleteTask from "../functions/deleteTask";
import BtnStandard from "./BtnStandard";
import { useRouter } from "next/navigation";

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

export default function Task({ data }: Props) {
  const router = useRouter();

  async function handleDelete() {
    deleteTask(data.id);
    router.refresh();
  }

  async function handleComplete() {
    completeTask(data.id);
    router.refresh();
  }

  if (data.completed) {
    return (
      <>
        <div
          className="flex flex-col justify-start items-center p-2 border
      rounded-lg bg-stone-300 bg-opacity-70 h-full"
        >
          <header className="text-xl text-stone-500 line-through">
            {data.title}
          </header>
          <p className="line-through text-sm text-stone-500 mb-2">
            {data.text}
          </p>
          <BtnStandard
            onClick={handleDelete}
            label="Delete"
            tailwind="mx-auto mt-auto"
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="flex flex-col justify-start items-center p-2 border
    rounded-lg bg-stone-300 bg-opacity-70 h-full"
      >
        <header className="text-xl text-white">{data.title}</header>
        <p className="text-sm mb-2">{data.text}</p>
        <BtnStandard
          onClick={handleComplete}
          label="Complete"
          tailwind="mx-auto mt-auto"
        />
      </div>
    </>
  );
}
