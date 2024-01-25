"use client";
import BtnStandard from "./BtnStandard";
import StandardLink from "./StandardLink";

export default function NavBarMain() {
  function search() {
    console.log(search);
  }

  return (
    <div
      className="w-full flex gap-2 sm:gap-3 justify-start p-3 bg-stone-400
     border-b sm:px-5 "
    >
      <StandardLink link="advancedSearch" label="Advanced Search" />
      <BtnStandard label="Login" />
    </div>
  );
}
