import { AuthHeader } from "@/components/auth/auth-header";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Footer } from "@/layouts/footer";
import BG from "@/assets/icons/bg.svg?react";
import TABLET_BG from "@/assets/icons/tablet_login.svg?react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col w-screen bg-muted pt-8 pb-16 ">
      <div className="max-w-[78%] w-full mx-auto bg-white rounded-3xl px-24 py-11 flex-1 flex flex-col justify-between">
        <AuthHeader
          linkText="Đăng nhập"
          linkHref="/sign-in"
          description="Đã có tài khoản?"
        />
        <main className="container mx-auto px-4 py-12 flex-1 items-center flex relative isolate">
          <div className="max-w-full mx-auto grid md:grid-cols-2 w-full items-center">
            {/* Form Section */}
            <div className="w-full max-w-full mx-auto lg:ml-auto pr-24">
              <SignUpForm />
            </div>
            <div>
              <TABLET_BG className="w-full h-auto" />
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
