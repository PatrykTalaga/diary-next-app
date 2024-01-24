"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BtnStandard from "./BtnStandard";
import Modal from "react-modal";
import addTask from "../functions/addTask";

type Props = {
  showModal: boolean;
  closeForm: () => void;
};

export default function AddTaskModal({ showModal, closeForm }: Props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function saveTask() {
    setErrorMessage("");

    if (title == "" || text == "") {
      setErrorMessage("Title and text cannot be empty");
      return;
    }

    try {
      const result = await addTask(title, text);
      if (result == false) {
        setErrorMessage("Server error, memo wasn't saved");
        return;
      }
    } catch (err) {
      console.error(err);
    }

    closeForm();
    setText("");
    setTitle("");
    router.refresh();
  }

  function closeModal() {
    closeForm();
    setText("");
    setTitle("");
  }

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={showModal}
        className="bg-stone-400 p-5 pt-2 w-5/6 border-2 border-black fixed
           z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <p onClick={closeModal} className="text-2xl font-bold text-end mb-1">
          X
        </p>
        {errorMessage !== "" && (
          <p className="text-xl font-bold text-center text-red-600 my-1">
            {errorMessage}
          </p>
        )}
        <form className="w-full grid grid-cols-[60px_auto] sm:grid-cols-[95px_auto] items-center">
          <label className="font-bold my-4 sm:text-2xl">Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="my-4 bg-neutral-100 border border-black"
          ></input>
          <label className="font-bold my-1 mb-auto sm:text-2xl ">Text: </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={15}
            className="bg-neutral-100 border border-black my-1"
          ></textarea>
          <div className="flex justify-center gap-2 sm:gap-5  col-span-2">
            <BtnStandard
              onClick={saveTask}
              label="Save"
              tailwind="text-xl"
            ></BtnStandard>
          </div>
        </form>
      </Modal>
    </>
  );
}
