"use client";

import { useState } from "react";
import BtnSubmit from "./BtnSubmit";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useState("");
  const { push } = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    push(`/search/${searchParams}`);
  };

  return (
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
  );
}
