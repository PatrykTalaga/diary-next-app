"use client";

import BtnStandard from "./BtnStandard";
import StandardLink from "./StandardLink";

export default function NavBarAlt() {
  function search() {
    console.log(search);
  }

  return (
    <div
      className="w-full flex gap-2 sm:gap-3 justify-start p-3 bg-stone-400
     border-b-2 sm:px-5"
    >
      <form className="flex gap-2 sm:gap-3">
        <input type="text" className="border-2 bg-neutral-200"></input>
        <BtnStandard onClick={search} label="Search" />
      </form>
      <StandardLink link="/" label="Main Page" />
      <BtnStandard label="Login" tailwind="ml-auto" />
    </div>
  );
}
