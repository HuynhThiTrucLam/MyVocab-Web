import { Link } from "react-router-dom";
import Logo from "@/assets/icons/logo.svg?react";

export function Header() {
  return (
    <header className=" mx-auto px-4 py-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        <Logo />
      </Link>
      <div className="space-x-4">
        <Link
          to="/sign-up"
          className="rounded-full px-10 py-3 border border-black hover:border-secondary text-black font-bold hover:text-secondary transition-all duration-300"
        >
          Đăng ký
        </Link>
        <Link
          to="/sign-in"
          className="rounded-full px-10 py-3 bg-secondary text-white hover:bg-secondary/20 font-bold hover:text-secondary transition-all duration-300"
        >
          Đăng nhập
        </Link>
      </div>
    </header>
  );
}
