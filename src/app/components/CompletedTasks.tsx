"use client";

import { useEffect, useState } from "react";
import NavBarAlt from "./NavBarAlt";
import BtnStandard from "./BtnStandard";
import TaskCompleted from "./TaskCompleted";

type Props = {
  data: Array<{
    id: string;
    title: string;
    text: string;
    createdAt: Date;
    completed: boolean;
    completedAt: Date;
  }>;
};

export default function CompletedTasks({ data }: Props) {
  const [searchParams, setSearchParams] = useState("");
  const [isHiddenSearch, setIsHiddenSearch] = useState({
    lable: "Show",
    value: false,
  });
  const [timePeriod, settimePeriod] = useState({
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
  });
  const [dataTask, setDataTask] = useState([]);
  useEffect(() => setDataTask(data), []);

  function hideBtn() {
    setIsHiddenSearch({
      lable: isHiddenSearch.lable == "Hide" ? "Show" : "Hide",
      value: !isHiddenSearch.value,
    });
  }

  function searchByTimePeriod() {
    console.log("aa");
  }

  function searchByTitle(e) {
    e.preventDefault();
    setDataTask(
      dataTask.toSorted(function (a, b) {
        const nameA = a.title.toUpperCase(); // ignore upper and lowercase
        const nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
    );
  }
  function searchByTags(e) {
    e.preventDefault();
    setDataTask(
      dataTask.toSorted(function (a, b) {
        return b.completedAt.getTime() - a.completedAt.getTime();
      })
    );
  }

  function searchByText() {
    console.log("searchByText");
  }

  return (
    <div
      className="w-full min-h-screen bg-stone-500 flex flex-col
      justify-start"
    >
      <NavBarAlt />
      <section
        className="bg-stone-400 p-5 border-b-2 w-full flex flex-col
        justify-center"
      >
        <div className="flex">
          <header className="text-xl sm:text-3xl mb-2 font-bold mr-2 sm:mr-4">
            Search by time:{" "}
          </header>
          <BtnStandard label={isHiddenSearch.lable} onClick={hideBtn} />
        </div>
        {isHiddenSearch.value && (
          <form className="w-full flex gap-2 sm:gap-5 items-center ">
            <div className="w-1/2">
              <label className="font-bold my-4 text-xl sm:text-2xl col-span-2">
                From:
              </label>

              <div className="w-full my-1 flex justify-center">
                <label className="w-5/12 sm:w-2/12 text-xl sm:text-2xl">
                  Year:{" "}
                </label>
                <input
                  type="text"
                  value={timePeriod.startYear}
                  onChange={(e) =>
                    settimePeriod({ ...timePeriod, startYear: e.target.value })
                  }
                  className="w-7/12 sm:w-10/12 bg-neutral-100 border
                  border-black"
                ></input>
              </div>

              <div className="w-full my-1 flex justify-center">
                <label className="w-5/12 sm:w-2/12 text-xl sm:text-2xl">
                  Month:{" "}
                </label>
                <input
                  type="text"
                  value={timePeriod.startMonth}
                  onChange={(e) =>
                    settimePeriod({ ...timePeriod, startMonth: e.target.value })
                  }
                  className="w-7/12 sm:w-10/12 bg-neutral-100 border
                  border-black"
                ></input>
              </div>
            </div>

            {/* Center */}

            <div className="w-1/2">
              <label className="font-bold my-4 text-xl sm:text-2xl col-span-2">
                To:
              </label>

              <div className="w-full my-1 flex justify-center">
                <label className="w-5/12 sm:w-2/12 text-xl  sm:text-2xl">
                  Year:{" "}
                </label>
                <input
                  type="text"
                  value={timePeriod.endYear}
                  onChange={(e) =>
                    settimePeriod({ ...timePeriod, endYear: e.target.value })
                  }
                  className="w-7/12 sm:w-10/12 bg-neutral-100 border
                  border-black"
                ></input>
              </div>

              <div className="w-full my-1 flex justify-center">
                <label className="w-5/12 sm:w-2/12 text-xl sm:text-2xl">
                  Month:{" "}
                </label>
                <input
                  value={timePeriod.endMonth}
                  type="text"
                  onChange={(e) =>
                    settimePeriod({ ...timePeriod, endMonth: e.target.value })
                  }
                  className="w-7/12 sm:w-10/12 bg-neutral-100 border
                  border-black"
                ></input>
              </div>
            </div>
          </form>
        )}

        {isHiddenSearch.value && (
          <BtnStandard
            label="Search"
            tailwind="text-xl mt-3 sm:mt-5 mx-auto"
            onClick={searchByTimePeriod}
          />
        )}
      </section>

      <section className="bg-stone-400 p-5 border-b-2 w-full">
        <header className="font-bold text-xl sm:text-3xl">Search: </header>
        <form className="w-full flex justify-start gap-2 sm:gap-4 my-4">
          <input
            type="text"
            onChange={(e) => setSearchParams(e.target.value)}
            className="bg-neutral-100 border border-black w-1/2 sm:w-1/5"
          ></input>
          <BtnStandard
            label="Title"
            tailwind="text-xl"
            onClick={searchByTitle}
          />
          <BtnStandard label="Tags" tailwind="text-xl" onClick={searchByTags} />
          <BtnStandard label="Text" tailwind="text-xl" onClick={searchByText} />
        </form>
      </section>

      <section className="mt-4 mx-4">
        <ul
          className="flex flex-col gap-2 
          sm:grid sm:grid-cols-4 sm:gap-5 sm:px-5"
        >
          {dataTask.map((data) => (
            <li key={data.id}>
              <TaskCompleted data={data} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
