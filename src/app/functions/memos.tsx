"use server";

import { deleteModel } from "mongoose";
import EditedMemoModel from "../../../models/editedMemoModel";
import Memo from "../../../models/memoModel";
import RemovedMemo from "../../../models/removedMemoModel";
import connectMongo from "../../../utils/connectMongo";
import { writeFile } from "fs/promises";
import { join } from "path";

type MemoType = {
  id: string;
  title: string;
  text: string;
  img: string;
  tags: Array<string>;
  createdAt: Date;
  edited: boolean;
  editedAt: Date;
};

type DataMemoType = Array<MemoType>;

type DataDeletedMemoType = Array<{
  id: string;
  oldId: string;
  title: string;
  text: string;
  img: string;
  tags: Array<string>;
  createdAt: Date;
  edited: boolean;
  editedAt: Date;
  deletedAt: Date;
}>;

//Get data from database//

export default async function fetchMemos(limit: number) {
  try {
    await connectMongo();
    let memos = await Memo.find().limit(limit);
    //remove object id (_id), add id string
    const memosIdString: DataMemoType = memos.map((memo) => {
      return {
        id: memo._id.toString(),
        title: memo.title,
        text: memo.text,
        img: memo.img,
        tags: memo.tags,
        createdAt: memo.createdAt,
        edited: memo.edited,
        editedAt: memo.editedAt,
      };
    });
    //sort by creaction date
    memosIdString.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return memosIdString;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function fetchAllMemos() {
  try {
    await connectMongo();
    let memos = await Memo.find();
    const memosIdString: DataMemoType = memos.map((memo) => {
      return {
        id: memo._id.toString(),
        title: memo.title,
        text: memo.text,
        img: memo.img,
        tags: memo.tags,
        createdAt: memo.createdAt,
        edited: memo.edited,
        editedAt: memo.editedAt,
      };
    });
    memosIdString.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return memosIdString;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getMemoById(memoId: string) {
  try {
    await connectMongo();
    let memo = await Memo.findOne({ _id: memoId });
    if (memo === null) return false;
    const memoIdString: MemoType = {
      id: memo._id.toString(),
      title: memo.title,
      text: memo.text,
      img: memo.img,
      tags: memo.tags,
      createdAt: memo.createdAt,
      edited: memo.edited,
      editedAt: memo.editedAt,
    };
    return memoIdString;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function searchMemo(searchParams: string) {
  try {
    await connectMongo();
    const regEx = new RegExp(searchParams, "i");
    let memos = await Memo.find({ title: regEx });
    if (memos.length === 0) return false;
    const memosIdString: DataMemoType = memos.map((memo) => {
      return {
        id: memo._id.toString(),
        title: memo.title,
        text: memo.text,
        img: memo.img,
        tags: memo.tags,
        createdAt: memo.createdAt,
        edited: memo.edited,
        editedAt: memo.editedAt,
      };
    });
    //sort by creaction date
    memosIdString.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return memosIdString;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getPreviousVersionsMemo(id: string) {
  try {
    await connectMongo();
    let memos = await EditedMemoModel.find({
      commonId: id,
    });

    memos.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    const memosIdString: DataMemoType = memos.map((memo) => {
      return {
        id: memo._id.toString(),
        title: memo.title,
        text: memo.text,
        img: memo.img,
        tags: memo.tags,
        createdAt: memo.createdAt,
        edited: memo.edited,
        editedAt: memo.editedAt,
      };
    });
    return memosIdString;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function fetchDeletedMemos() {
  try {
    await connectMongo();
    let memos = await RemovedMemo.find();
    const memosIdString: DataDeletedMemoType = memos.map((memo) => {
      return {
        id: memo._id.toString(),
        oldId: memo.oldId,
        title: memo.title,
        text: memo.text,
        img: memo.img,
        tags: memo.tags,
        createdAt: memo.createdAt,
        edited: memo.edited,
        editedAt: memo.editedAt,
        deletedAt: memo.editedAt,
      };
    });
    memosIdString.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return memosIdString;
  } catch (err) {
    console.error(err);
    return false;
  }
}

//Other functions (create, edit, delete)//

export async function addMemo(title: string, text: string, tags: string) {
  const date = new Date();

  try {
    await connectMongo();
    if (title == "" || text == "") return false;

    let tagsArr: Array<string> = [];
    if (tags !== "") tagsArr = tags.split(" ");

    const newMemo = {
      title: title,
      text: text,
      img: "",
      tags: tagsArr,
      edited: false,
      createdAt: date,
      editedAt: date,
    };

    const savedMemo: { _id: string } = await Memo.create(newMemo);
    return savedMemo._id.toString(); //it is object id
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteMemo(id: string) {
  //add memo to deleted collection and delete from memo collection
  const date = new Date();

  try {
    await connectMongo();

    const memo = await Memo.findOne({ _id: id });
    if (memo === null) return;

    const newMemo = {
      oldId: memo._id.toString(),
      title: memo.title,
      text: memo.text,
      img: memo.img,
      tags: memo.tags,
      edited: true,
      createdAt: memo.createdAt,
      editedAt: memo.editedAt,
      deletedAt: date,
    };

    const result = await Memo.deleteOne({ _id: id });
    if (result.acknowledged !== true) return false;

    await RemovedMemo.create(newMemo);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

export async function editMemo(
  id: string,
  title: string,
  text: string,
  tags: string,
  img: string
) {
  //add current memo to previous versions collections and then update
  const date = new Date();

  try {
    await connectMongo();

    const memo = await Memo.findOne({ _id: id });
    if (memo === null) return;

    if (title == "" || text == "") return false;

    let tagsArr: Array<string> = [];
    if (tags !== "") tagsArr = tags.split(" ");

    const previousVerion = {
      commonId: id,
      title: memo.title,
      text: memo.text,
      img: memo.img,
      tags: memo.tags,
      edited: true,
      createdAt: memo.createdAt,
      editedAt: memo.editedAt,
      deletedAt: date,
    };

    memo.title = title;
    memo.text = text;
    memo.img = img;
    memo.tags = tags;
    memo.edited = true;
    memo.editedAt = date;

    await memo.save();
    await EditedMemoModel.create(previousVerion);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

//Images//
export async function addNewImage(data: FormData, id: string) {
  const file: File | null = data.get("img") as unknown as File;
  if (file.size == 0) return false;
  if (file.size > 1000000) return false;

  try {
    await connectMongo();
    const memo = await Memo.findOne({ _id: id });
    if (memo === null) return false;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const format = file.name.substring(file.name.length - 4);
    const imageId = crypto.randomUUID();
    const newFileName = imageId + format;
    const path = join("public/", "images/", newFileName);

    await writeFile(path, buffer);
    memo.img = newFileName;
    await memo.save();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
