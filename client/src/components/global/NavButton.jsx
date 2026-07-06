import { Link } from "react-router-dom";

export function NavButton({ buttonText, to }) {
  return (
    <Link
      to={to}
      className=" text-center bg-primary px-4 py-1 md:text-base lg:text-xl text-white rounded-full cursor-pointer hover:scale-105"
    >
      {buttonText}
    </Link>
  );
}
