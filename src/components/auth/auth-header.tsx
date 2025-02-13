import { Link } from "react-router-dom";
import Logo from "@/assets/icons/logo.svg?react";
interface AuthHeaderProps {
  linkText: string;
  linkHref: string;
  description: string;
}

export function AuthHeader({
  linkText,
  linkHref,
  description,
}: AuthHeaderProps) {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        <Logo />
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-gray-600">{description}</span>
        <Link
          to={linkHref}
          className="text-black font-medium hover:text-primary"
        >
          {linkText} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
