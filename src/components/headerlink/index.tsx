import { Link } from "react-router-dom";

type HeaderLinkProps = {
  to: string;
  text: string;
  currentPath: string;
};
const HeaderLink = ({ to, text, currentPath }: HeaderLinkProps) => {
  return (
    <Link
      to={to}
      className={`font-medium text-sm text-black hover:text-secondary transition-all ${
        currentPath.includes(to) ? "!font-bold" : ""
      }`}
    >
      {text}
    </Link>
  );
};

export default HeaderLink;
