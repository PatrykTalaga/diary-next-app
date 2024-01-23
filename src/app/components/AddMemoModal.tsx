"use client";
import { useState } from "react";
import BtnStandard from "./BtnStandard";
import Modal from "react-modal";

type Props = {
  showModal: boolean;
  closeForm: () => void;
};

export default function AddMemoModal({ showModal, closeForm }: Props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  function saveMemo() {
    console.log("saveMemo");
  }
  function resetForm() {
    console.log("resetForm");
  }

  return (
    <>
      <Modal
        isOpen={showModal}
        className="bg-stone-400 p-5 pt-2 w-5/6 border-2 border-black
          fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <p onClick={closeForm} className="text-2xl font-bold text-end mb-1">
          X
        </p>
        <form className="w-full grid grid-cols-[60px_auto] sm:grid-cols-[95px_auto] items-center">
          <label className="font-bold my-4 sm:text-2xl">Title: </label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="my-4 bg-neutral-100 border border-black"
          ></input>
          <label className="font-bold my-1 mb-auto sm:text-2xl ">Text: </label>
          <textarea
            onChange={(e) => setText(e.target.value)}
            rows={15}
            className="bg-neutral-100 border border-black my-1"
          ></textarea>
          <label className="font-bold my-4 sm:text-2xl">Image: </label>
          <input type="file" className="my-4 sm:text-2xl"></input>
        </form>
        <div className="flex justify-center gap-2 sm:gap-5">
          <BtnStandard
            onClick={saveMemo}
            label="Save"
            tailwind="text-xl"
          ></BtnStandard>
          <BtnStandard
            onClick={resetForm}
            label="Reset"
            tailwind="text-xl"
          ></BtnStandard>
          <BtnStandard
            onClick={closeForm}
            label="Cancel"
            tailwind="text-xl"
          ></BtnStandard>
        </div>
      </Modal>
    </>
  );
}
