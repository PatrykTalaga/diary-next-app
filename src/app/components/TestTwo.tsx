"use client";
import { useState } from "react";
import AddMemoModal from "./AddMemoModal";

export default function TestTwo() {
  const [showModal, setShowModaln] = useState(false);

  return (
    <div>
      <AddMemoModal
        showModal={showModal}
        closeForm={() => setShowModaln(false)}
      />
      <button onClick={() => setShowModaln(true)}>Here Two</button>
    </div>
  );
}
