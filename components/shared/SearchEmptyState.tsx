"use client";

import SearchIcon from "../icons/SearchIcon";

type Props = {
  searchValue: string;
  typeData: string;
};

export default function SearchEmptyState({ searchValue, typeData }: Props) {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl  bg-card p-8 text-center ">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-main/10">
          <SearchIcon />
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-main">No matching {typeData} found</h2>

        <p className="mt-3 text-sm leading-6 text-secondary">
          We couldn't find any {typeData} matching{" "}
          <span className="font-medium text-main">"{searchValue}"</span>
        </p>
      </div>
    </div>
  );
}
