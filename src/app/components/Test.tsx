"use client";
import { useState } from "react";
import EditMemoModal from "./EditMemoModal";

export default function Test() {
  const [showModal, setShowModaln] = useState(false);

  return (
    <div>
      <EditMemoModal
        showModal={showModal}
        closeForm={() => setShowModaln(false)}
      />
      <button onClick={() => setShowModaln(true)}>Here</button>
    </div>
  );
}
