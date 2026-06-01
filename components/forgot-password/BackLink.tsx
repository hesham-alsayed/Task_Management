import Link from "next/link";
import LeftArrowIcon from "../icons/LeftArrowIcon";

export default function BackLink() {
  return (
    <div className="text-center flex items-center justify-center">
      <Link
        href={"/login"}
        className="text-sm hover:underline text-primary font-medium flex items-center justify-center gap-2"
      >
        <LeftArrowIcon /> Back to log in
      </Link>
    </div>
  );
}