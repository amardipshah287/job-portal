import { Link } from "react-router-dom";

export function NavLinks({ linkText, to }) {
  return (
    <Link
      to={to}
      className="hover:scale-110 md:hover:scale-100 md:hover:text-primary"
    >
      {linkText}
    </Link>
  );
}
