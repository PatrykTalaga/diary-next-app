"use client";

import { useState } from "react";
import BtnStandard from "./BtnStandard";
import StandardLink from "./StandardLink";

export default function NavBarAlt() {
  const [searchParams, setSearchParams] = useState("");

  return (
    <div
      className="w-full flex gap-2 sm:gap-3 justify-start p-3 bg-stone-400
     border-b-2 sm:px-5"
    >
      <form className="flex gap-2 sm:gap-3 justify-start p-2 border bg-stone-500">
        <input
          type="text"
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
        ></input>
        <StandardLink link={`/search/${searchParams}`} label="Search" />
      </form>
      <StandardLink link="/" label="Main Page" />
      <BtnStandard label="Login" />
    </div>
  );
}
