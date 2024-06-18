import Link from "next/link";

interface HeaderItemProps {
  href?: string | null;
  onClick?: () => void | null;
  text: string;
}

export const HeaderItem = ({ href, onClick, text }: HeaderItemProps) => {
  return (
    <>
      {href ? (
        <Link href={href} className="p-4 hover:bg-grey-100">
          {text}
        </Link>
      ) : (
        onClick && (
          <button
            onClick={onClick}
            className="p-4 text-right hover:bg-grey-100"
          >
            {text}
          </button>
        )
      )}
      <hr className="border-grey-200" />
    </>
  );
};
