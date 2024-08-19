import { ReactNode } from "react";
import { Link } from "react-router-dom";
export default function NavLink({
  to,
  children,
  classNames,
}: {
  to: string;
  children: ReactNode;
  classNames?: string;
}) {
  return (
    <Link
      to={to}
      className={`${classNames} capitalize hover:opacity-50 transition-all`}
    >
      {children}
    </Link>
  );
}
