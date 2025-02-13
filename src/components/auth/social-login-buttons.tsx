import { Button } from "@/components/ui/button";
import GG from "@/assets/icons/gg.svg?react";

export function SocialLoginButtons({
  onGoogleSignIn,
}: {
  onGoogleSignIn: () => void;
}) {
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full rounded-full py-[18px] px-6 h-auto relative"
        onClick={onGoogleSignIn}
      >
        Đăng nhập với Google
        <GG className="scale-150 left-6 w-7 h-7" />
      </Button>
    </div>
  );
}
