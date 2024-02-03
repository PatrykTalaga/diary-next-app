"use server";

import StandardLink from "./StandardLink";
import SearchBar from "./SearchBar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function NavBarMain() {
  const session = await getServerSession(options);

  return (
    <div
      className="w-full flex gap-2 sm:gap-3 justify-start p-3 bg-stone-400
     border-b sm:px-5 "
    >
      <SearchBar />
      <StandardLink link="advancedSearch" label="Advanced Search" />
      <StandardLink link="deletedMemos" label="Deleted Memos" />
      {session ? (
        <StandardLink link={"/api/auth/signout?callbackUrl=/"} label="Logout" />
      ) : (
        <StandardLink link={"/api/auth/signin"} label="Login" />
      )}
    </div>
  );
}
