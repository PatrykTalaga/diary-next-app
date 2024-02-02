"use client";
import { useState } from "react";
import BtnStandard from "./BtnStandard";
import StandardLink from "./StandardLink";
import BtnSubmit from "./BtnSubmit";
import { useRouter } from "next/navigation";

export default function NavBarMain() {
  const [searchParams, setSearchParams] = useState("");
  const { push } = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    push(`/search/${searchParams}`);
  };

  return (
    <div
      className="w-full flex gap-2 sm:gap-3 justify-start p-3 bg-stone-400
     border-b sm:px-5 "
    >
      <form
        onSubmit={handleSearch}
        className="flex gap-2 sm:gap-3 justify-start p-2 border bg-stone-500"
      >
        <input
          type="text"
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
        ></input>
        <BtnSubmit label="search" />
      </form>

      <StandardLink link="advancedSearch" label="Advanced Search" />
      <StandardLink link="deletedMemos" label="Deleted Memos" />
      <BtnStandard label="Login" />
    </div>
  );
}
