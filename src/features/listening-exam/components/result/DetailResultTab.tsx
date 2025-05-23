import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface DetailResultTabProps {
  title: string;
  icon: React.ReactNode;
  content?: any;
}

const DetailResultTab = ({ title, icon }: DetailResultTabProps) => {
  return (
    <div className="cursor-pointer ml-[2px] mr-[2px] w-[99%] overflow-auto shadow-[0_0_2px_0_rgba(123,138,131,0.4)]">
      <Drawer>
        <DrawerTrigger className="flex text-[14px] font-bold flex-row gap-2 items-center">
          {icon}
          <p>{title}</p>
        </DrawerTrigger>
        <DrawerContent className="w-full">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DetailResultTab;
