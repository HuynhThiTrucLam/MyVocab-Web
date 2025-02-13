import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthHeader } from "@/components/auth/auth-header";
import { PasswordInput } from "@/components/auth/password-input";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Footer } from "@/layouts/footer";
import BG from "@/assets/icons/bg.svg?react";
import TABLET_BG from "@/assets/icons/tablet_login.svg?react";
import SUCCESS_ICON from "@/assets/icons/success.svg?react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInPage() {
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn(formData.email, formData.password);
      toast({
        title: "Đăng nhập thành công!",
        description: "Đăng nhập thành công!",
        variant: "default",
        color: "success",
        action: <SUCCESS_ICON className="w-6 h-6 text-green-500" />,
      });
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      toast({
        title: "Đăng nhập thất bại!",
        description: "Đăng nhập thất bại!",
        variant: "destructive",
        color: "error",
      });
    }
  };

  const updateFormData = (field: keyof SignInFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col w-screen bg-muted pt-8 pb-16 ">
      <div className="max-w-[78%] w-full mx-auto bg-white rounded-3xl px-24 py-11 flex-1 flex flex-col justify-between">
        <AuthHeader
          linkText="Đăng Ký ngay"
          linkHref="/sign-up"
          description="Chưa có tài khoản"
        />

        <main className="container mx-auto px-4 py-12 flex-1 items-center flex relative isolate">
          <div className="max-w-full mx-auto grid md:grid-cols-2 w-full items-center">
            {/* Form Section */}
            <div className="max-w-full mx-auto w-full space-y-8 pr-24">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Tên đăng nhập hoặc email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email")(e.target.value)}
                    className="rounded-full px-6 py-[18px]"
                  />
                  <PasswordInput
                    value={formData.password}
                    onChange={updateFormData("password")}
                  />
                </div>

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:underline text-sm"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-secondary hover:bg-secondary-hover text-white font-bold text-base px-6 py-[18px] h-auto"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">hoặc</span>
                  </div>
                </div>

                <SocialLoginButtons />
              </form>
            </div>

            {/* Illustration */}
            <div className="hidden md:block">
              <TABLET_BG className="w-full h-full" />
            </div>
          </div>
          <div className="absolute w-[130%] h-full top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 -z-10">
            <BG className="w-full h-full" />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
