"use client";

import Link from "next/link";
import FragmentIcon from "../icons/FragmentIcon";

export type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
};

export default function CurrentLocation({ items }: Props) {
  return (
    <nav className="flex items-center gap-2">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.label}
            style={{ letterSpacing: "1.2px" }}
            className="flex items-center gap-2 font-bold text-[12px] uppercase"
          >
            {index !== 0 && <FragmentIcon />}

            {isLast || !item.href ? (
              <p className="text-primary">{item.label}</p>
            ) : (
              <Link href={item.href} className="text-[#43465499]">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
