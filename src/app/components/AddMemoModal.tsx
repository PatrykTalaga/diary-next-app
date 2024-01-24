"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BtnStandard from "./BtnStandard";
import Modal from "react-modal";
import addMemo from "../functions/addMemo";
import addNewImage from "../functions/addNewImage";
import BtnSubmit from "./BtnSubmit";

type Props = {
  showModal: boolean;
  closeForm: () => void;
};

export default function AddMemoModal({ showModal, closeForm }: Props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function saveMemo(formData: FormData) {
    setErrorMessage("");

    if (title == "" || text == "") {
      setErrorMessage("Title and text cannot be empty");
      return;
    }
    const file: File | null = formData.get("img") as unknown as File;
    if (file.size == 0) {
      try {
        const result = await addMemo(title, text);
        if (result == false) {
          setErrorMessage("Server error, memo wasn't saved");
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (file.size !== 0) {
      try {
        //check file size and format
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          `${file.type}`;
          setErrorMessage(`Wrong file format, upload jpeg or png file`);
          return;
        }
        if (file.size > 1000000) {
          setErrorMessage(
            `File Size is too big, upload file that is 1Mb or less`
          );
          return;
        }

        //save text first
        const result = await addMemo(title, text);
        if (result == false) {
          setErrorMessage("Server error, memo wasn't saved");
          return;
        }
        //save img
        const resultImg = await addNewImage(formData, result);
        if (resultImg !== true) {
          setErrorMessage("Server error, memo was saved but image was not");
          return;
        }
      } catch (error) {
        setErrorMessage("Unknown Error!");
        return;
      }
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
        className="bg-stone-400 p-5 pt-2 w-5/6 border-2 border-black
          fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <p onClick={closeModal} className="text-2xl font-bold text-end mb-1">
          X
        </p>
        {errorMessage !== "" && (
          <p className="text-xl font-bold text-center text-red-600 my-1">
            {errorMessage}
          </p>
        )}
        <form
          action={saveMemo}
          className="w-full grid grid-cols-[60px_auto] sm:grid-cols-[95px_auto] items-center"
        >
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
          <label className="font-bold my-4 sm:text-2xl">Image: </label>
          <input type="file" name="img" className="my-4 sm:text-2xl"></input>
          <div className="flex justify-center gap-2 sm:gap-5  col-span-2">
            <BtnSubmit label="Save" tailwind="text-xl"></BtnSubmit>
          </div>
        </form>
      </Modal>
    </>
  );
}
