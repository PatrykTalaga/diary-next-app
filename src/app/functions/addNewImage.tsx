"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import connectMongo from "../../../utils/connectMongo";
import Memo from "../../../models/memoModel";
/* import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options"; */

export default async function addNewImage(data: FormData, id: string) {
  /*   const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  } */

  const file: File | null = data.get("img") as unknown as File;
  if (file.size == 0) return false;
  if (file.size > 1000000) return false;

  const imageId = crypto.randomUUID();
  try {
    await connectMongo();
    const memo = await Memo.findOne({ _id: id });
    if (memo === null) return false;
    //save cover
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const format = file.name.substring(file.name.length - 4);
    const newFileName = imageId + format;
    const path = join("public/", "images/", newFileName);
    await writeFile(path, buffer);
    //save new image name in DB
    memo.img = newFileName;
    await memo.save();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
