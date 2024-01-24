"use server";

import connectMongo from "../../../utils/connectMongo";
import Task from "../../../models/taskModel";
/* import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options"; */

export default async function addTask(title: string, text: string) {
  /* const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  } */

  const date = new Date();

  try {
    await connectMongo();
    if (title == "" || text == "") return false;
    const newTask = {
      title: title,
      text: text,
      completed: false,
      createdAt: date,
      completedAt: date,
    };

    await Task.create(newTask);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
