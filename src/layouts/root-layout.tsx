import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";
import BG from "@/assets/icons/bg.svg?react";
import { Toaster } from "@/components/ui/toaster"


export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col w-screen bg-muted pt-8 pb-16">
      <div className="max-w-[78%] w-full mx-auto bg-white rounded-3xl px-24 py-11">
        <Header />
        <main className="flex-1 relative isolate">
          <div className="z-10">
            <Outlet />
          </div>

          <div className="absolute w-[130%] h-full top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 -z-10">
            <BG className="w-full h-full" />
          </div>
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}
