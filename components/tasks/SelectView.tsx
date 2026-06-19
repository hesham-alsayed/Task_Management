"use client";

import Select, { SingleValue } from "react-select";
import BoardViewIcon from "../icons/BoardViewIcon";
import ListViewIcon from "../icons/ListViewIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ViewOption = {
  value: "board" | "list";
  label: string;
  icon: React.ComponentType;
};

const options: ViewOption[] = [
  {
    value: "board",
    label: "Board View",
    icon: BoardViewIcon,
  },
  {
    value: "list",
    label: "List View",
    icon: ListViewIcon,
  },
];

export default function SelectView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentView = (searchParams.get("view") as "board" | "list") || "board";

  const selectedOption =
    options.find((option) => option.value === currentView) ?? options[0];

  const handleChangeView = (option: SingleValue<ViewOption>) => {
    if (!option) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("view", option.value);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-[180px]">
      <Select<ViewOption>
        instanceId="project-view-select"
        options={options}
        value={selectedOption}
        isSearchable={false}
        onChange={handleChangeView}
        formatOptionLabel={(option) => {
          const Icon = option.icon;

          return (
            <div className="flex items-center gap-2">
              <Icon />
              <span>{option.label}</span>
            </div>
          );
        }}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "40px",
            cursor: "pointer",
            boxShadow: "none",
            borderColor: "#d1d5db",

            "&:hover": {
              borderColor: "#d1d5db",
            },
          }),

          singleValue: (base) => ({
            ...base,
            color: "#000",
          }),

          menu: (base) => ({
            ...base,
            overflow: "hidden",
          }),

          option: (base, state) => ({
            ...base,
            cursor: "pointer",
            color: "#000",
            backgroundColor: state.isSelected
              ? "#e5e7eb"
              : state.isFocused
                ? "#f3f4f6"
                : "#fff",

            ":active": {
              backgroundColor: "#e5e7eb",
            },
          }),

          indicatorSeparator: () => ({
            display: "none",
          }),
        }}
      />
    </div>
  );
}
