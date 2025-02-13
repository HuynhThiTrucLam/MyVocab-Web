import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/icons/logo.svg?react";


export function Header() {
  return (
    <header className=" mx-auto px-4 py-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        <Logo />
      </Link>
      <div className="space-x-4">
        <Button variant="outline" className="rounded-full px-10 py-3 border border-black hover:border-secondary">
          Đăng ký
        </Button>
        <Button className="rounded-full px-10 py-3 bg-secondary text-black hover:bg-secondary/80">
          Đăng nhập
        </Button>
      </div>
    </header>
  );
}
