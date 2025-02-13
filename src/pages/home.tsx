import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import MAN_BG from "@/assets/icons/man_bg.svg?react";
import BOOKMARK from "@/assets/icons/bookmark.svg?react";
import CHATBOX from "@/assets/icons/chatbox.svg?react";
import SEARCH from "@/assets/icons/search.svg?react";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        <h1 className="text-5xl font-extrabold mb-12 text-center">
          Tra cứu từ vựng
        </h1>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative z-10">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <SEARCH className="h-5 w-5 text-secondary" />
          </div>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Thêm từ vựng cần tìm ..."
            className="rounded-full pl-12 pr-16 py-6 shadow-lg"
          />
          <Button className="absolute top-1/2 right-5 -translate-y-1/2 rounded-full bg-secondary hover:bg-secondary/90 p-3">
            <ArrowRight className="h-4 w-4 max-w-full text-white" />
          </Button>
        </div>

        {/* Illustration */}
        <div className="mb-8 flex justify-center items-center">
          <MAN_BG className=" w-[450px] h-[450px] " />
        </div>

        {/* Quote */}
        <p className="text-xl mb-16 text-center">
          <span className="font-bold">"Nothing</span> is impossible"
        </p>

      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="flex flex-col items-center space-y-4 pt-6">
            <div className="p-4 rounded-full bg-secondary/10">
              <BOOKMARK className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="text-xl font-bold">Từ vựng của tôi</h2>
            <p className="text-gray-600 text-sm  text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="flex flex-col items-center space-y-4 pt-6">
            <div className="p-4 rounded-full bg-secondary/10">
              <CHATBOX className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="text-xl font-bold">Chatbox</h2>
            <p className="text-gray-600 text-sm text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
