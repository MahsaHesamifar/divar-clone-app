import Link from "next/link";

import type { HeaderItemProps } from "./types";

export const HeaderItem = ({ href, text }: HeaderItemProps) => {
  return (
    <>
      <Link href={href} className="p-4 hover:bg-grey-100">
        {text}
      </Link>

      <hr className="border-grey-200" />
    </>
  );
};
