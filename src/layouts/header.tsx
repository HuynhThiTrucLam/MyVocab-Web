import { Link } from "react-router-dom";
import Logo from "@/assets/icons/logo.svg?react";
import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "react-router-dom";
import HeaderLink from "@/components/headerlink";
import NullAbleComponent from "@/components/ui/NullAbleComponent";
export function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className=" mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold">
          <Logo />
        </Link>
        <NullAbleComponent isNull={!user}>
          <div className="space-x-4">
            <HeaderLink
              to="/my-vocab"
              text="My Vocab"
              currentPath={currentPath}
            />
            <HeaderLink
              to="/chatbox"
              text="Chatbox"
              currentPath={currentPath}
            />
          </div>
        </NullAbleComponent>
      </div>
      <NullAbleComponent isNull={!!user}>
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
      </NullAbleComponent>
    </header>
  );
}
