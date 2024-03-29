"use client";

import { useState } from "react";
import BtnStandard from "./BtnStandard";
import BtnSubmit from "./BtnSubmit";
import MemoListViewOnly from "./MemoListViewOnly";
import MemoListDeleted from "./MemoListDeleted";

type Props = {
  data: Array<{
    id: string;
    title: string;
    text: string;
    img: string;
    tags: Array<string>;
    createdAt: Date;
    edited: boolean;
    editedAt: Date;
    deletedAt: Date;
  }>;
};

export default function SearchMemosDeleted({ data }: Props) {
  //main search input
  const [searchParams, setSearchParams] = useState("");
  //variables for sorting by
  const [titleStatus, setTitleStatus] = useState(true);
  const [createdAtStatus, setCreatedAtStatus] = useState(true);
  const [editedAtStatus, setEditedAtStatus] = useState(true);
  //hide components
  const [isHiddenSearch, setIsHiddenSearch] = useState({
    lable: "Show",
    value: false,
  });
  const [isHiddenSort, setIsHiddenSort] = useState({
    lable: "Show",
    value: false,
  });
  //search by time period input
  const [timePeriod, settimePeriod] = useState({
    year: 0,
    month: 0,
  });
  //data to display
  const [dataMemo, setDataMemo] = useState(data);

  //***Sort And Search Functions**********************************************//
  //Search
  const searchByTitle = (event: React.MouseEvent) => {
    event.preventDefault();
    const regEx = new RegExp(searchParams, "i");
    setDataMemo(data.filter((data) => data.title.match(regEx)));
  };

  const searchByText = (event: React.MouseEvent) => {
    event.preventDefault();
    const regEx = new RegExp(searchParams, "i");
    setDataMemo(data.filter((data) => data.text.match(regEx)));
  };

  const searchByTags = (event: React.MouseEvent) => {
    event.preventDefault();
    const regEx = new RegExp(searchParams, "i");

    setDataMemo(
      data.filter((data) => {
        const newArr = data.tags.filter((tag) => tag.match(regEx));
        if (newArr.length !== 0) {
          return data;
        }
      })
    );
    console.log(dataMemo);
  };

  const searchByTimePeriod = (event: React.MouseEvent) => {
    event.preventDefault();
    if (timePeriod.month == 0) {
      setDataMemo(
        data.filter((data) => data.createdAt.getFullYear() == timePeriod.year)
      );
      return;
    }
    setDataMemo(
      data.filter((data) => {
        return (
          data.createdAt.getFullYear() == timePeriod.year &&
          data.createdAt.getMonth() == timePeriod.month - 1 //it starts at 0?
        );
      })
    );
  };

  //Sort
  const sortByTitle = (event: React.MouseEvent) => {
    event.preventDefault();
    if (titleStatus) {
      setDataMemo(
        dataMemo.toSorted(function (a, b) {
          const nameA = a.title.toUpperCase();
          const nameB = b.title.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
      );
      setTitleStatus(!titleStatus);
      return;
    }
    setDataMemo(
      dataMemo.toSorted(function (a, b) {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      })
    );
    setTitleStatus(!titleStatus);
  };

  const sortByCompleted = (event: React.MouseEvent) => {
    event.preventDefault();
    if (editedAtStatus) {
      setDataMemo(
        dataMemo.toSorted(function (a, b) {
          if (a.editedAt.getTime() < b.editedAt.getTime()) return -1;
          if (a.editedAt.getTime() > b.editedAt.getTime()) return 1;
          return 0;
        })
      );
      setEditedAtStatus(!editedAtStatus);
      return;
    }
    setDataMemo(
      dataMemo.toSorted(function (a, b) {
        if (a.editedAt.getTime() > b.editedAt.getTime()) return -1;
        if (a.editedAt.getTime() < b.editedAt.getTime()) return 1;
        return 0;
      })
    );
    setEditedAtStatus(!editedAtStatus);
  };

  const sortByCreated = (event: React.MouseEvent) => {
    event.preventDefault();
    if (createdAtStatus) {
      setDataMemo(
        dataMemo.toSorted(function (a, b) {
          if (a.createdAt.getTime() < b.createdAt.getTime()) return -1;
          if (a.createdAt.getTime() > b.createdAt.getTime()) return 1;
          return 0;
        })
      );
      setCreatedAtStatus(!createdAtStatus);
      return;
    }
    setDataMemo(
      dataMemo.toSorted(function (a, b) {
        if (a.createdAt.getTime() > b.createdAt.getTime()) return -1;
        if (a.createdAt.getTime() < b.createdAt.getTime()) return 1;
        return 0;
      })
    );
    setCreatedAtStatus(!createdAtStatus);
  };

  //Clear
  const clearSearch = (event: React.MouseEvent) => {
    event.preventDefault();
    setDataMemo(data);
  };
  //***End********************************************************************//

  function hideSearch() {
    setIsHiddenSearch({
      lable: isHiddenSearch.lable == "Hide" ? "Show" : "Hide",
      value: !isHiddenSearch.value,
    });
  }
  function hideSort() {
    setIsHiddenSort({
      lable: isHiddenSort.lable == "Hide" ? "Show" : "Hide",
      value: !isHiddenSort.value,
    });
    console.log(isHiddenSort);
  }

  return (
    <>
      <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 sm:mx-auto">
        {/* Main search */}
        <section
          className="flex flex-col justify-center items-start gap-2 
          bg-stone-400 py-2 px-5 border-2 my-2 mx-auto mt-4 sm:w-full"
        >
          <header className="font-bold text-xl sm:text-2xl">Search: </header>
          <form className="flex justify-start items-center gap-2 sm:gap-4">
            <input
              type="text"
              onChange={(e) => setSearchParams(e.target.value)}
              className="bg-neutral-100 border border-black w-48 sm:w-auto"
            ></input>
            <BtnSubmit
              label="Title"
              tailwind="text-xl"
              onClick={searchByTitle}
            />
            <BtnSubmit label="Text" tailwind="text-xl" onClick={searchByText} />
            <BtnSubmit label="Tags" tailwind="text-xl" onClick={searchByTags} />
          </form>
          <BtnSubmit
            label="Clear Search"
            tailwind="text-xl"
            onClick={clearSearch}
          />
        </section>

        {/* Main search by time Period*/}
        <section
          className="bg-stone-400 py-2 px-5 border-2 mx-auto my-2 sm:mt-4 flex 
          flex-col justify-center sm:w-full"
        >
          <div className="flex items-center">
            <header className="text-xl sm:text-2xl font-bold mr-2 sm:mr-4 ">
              Search by time:{" "}
            </header>
            <BtnStandard label={isHiddenSearch.lable} onClick={hideSearch} />
          </div>
          {isHiddenSearch.value && (
            <p className="my-1">
              To search only by year leave month equal to 0
            </p>
          )}
          {isHiddenSearch.value && (
            <form className="flex flex-col mt-2 items-center ">
              <div className="my-1 flex gap-2 ml-auto">
                <label className="text-xl sm:text-2xl">Year: </label>
                <input
                  required
                  type="number"
                  value={timePeriod.year}
                  onChange={(e) =>
                    settimePeriod({
                      ...timePeriod,
                      year: Number(e.target.value),
                    })
                  }
                  className="bg-neutral-100 border
                  border-black"
                ></input>
              </div>
              <div className=" my-1 flex gap-2 ml-auto">
                <label className="text-xl sm:text-2xl">Month: </label>
                <input
                  type="number"
                  value={timePeriod.month}
                  onChange={(e) =>
                    settimePeriod({
                      ...timePeriod,
                      month: Number(e.target.value),
                    })
                  }
                  className="bg-neutral-100 border
                  border-black"
                ></input>
              </div>
              <BtnSubmit
                label="Search"
                tailwind="text-xl my-2 mb-0 mx-auto"
                onClick={searchByTimePeriod}
              />
            </form>
          )}
        </section>

        {/* Sort */}
        <section
          className="flex flex-col gap-2 justify-center items-center py-2 px-5 border-2
        mx-auto my-2 bg-stone-400 sm:mt-4 sm:w-full"
        >
          <div className="flex gap-2 items-center">
            <header className="text-xl sm:text-2xl font-bold">Sort by: </header>
            <BtnStandard label={isHiddenSort.lable} onClick={hideSort} />
          </div>

          {isHiddenSort.value && (
            <div className="flex gap-2 justify-center items-center mx-auto my-2 ">
              <BtnSubmit
                label="Title"
                tailwind="text-xl"
                onClick={sortByTitle}
              />
              <BtnSubmit
                label="Date Created"
                tailwind="text-xl"
                onClick={sortByCreated}
              />
              <BtnSubmit
                label="Date Edited"
                tailwind="text-xl"
                onClick={sortByCompleted}
              />
            </div>
          )}
        </section>
      </div>

      {/* Display data */}
      <MemoListDeleted dataMemo={dataMemo} />
    </>
  );
}
