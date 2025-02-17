import { WorkspaceList } from "@/components/workspace/workspace-list";
import { useAuth } from "@/contexts/auth-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import AuthBackground from "@/assets/icons/auth_bg.svg?react";
import { Link } from "react-router-dom";

export default function MyListWorkspace() {
  const { user } = useAuth();
  console.log("user", user);
  return (
    <>
      {user ? (
        <div className="container mx-auto px-4 py-8">
          <WorkspaceList />
        </div>
      ) : (
        <div className="w-full h-full px-4">
          <Link to="/" className="flex items-center gap-2 cursor-pointer text-black hover:text-secondary transition-all">
            <ArrowLeft className="font-bold text-secondary" />
            <span className="text-sm font-bold">My Vocab</span>
          </Link>
          <div className="flex items-center gap-2 justify-center flex-col  max-w-[70%] mx-auto">
            <div className="mb-4">
              <AuthBackground className="w-full h-full" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">
                Chức năng này cần đăng nhập
              </h1>
              <p className="text-sm text-muted-foreground">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
