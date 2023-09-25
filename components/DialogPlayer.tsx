"use client";

import { Song } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// Define an array of background colors
const backgroundColors = [
  "from-blue-800",
  "from-emerald-800",
  "from-rose-800",
  "from-slate-800",
  "from-orange-800",
];

// Function to get a random background color
const getRandomBackgroundColor = () => {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randomIndex];
};

interface DialogPlayerProps {
  children: React.ReactNode;
}

const DialogPlayer: React.FC<DialogPlayerProps> = ({ children }) => {
  const [bgColor, setBgColor] = useState(getRandomBackgroundColor());

  // Update the background color when the component mounts
  useEffect(() => {
    setBgColor(getRandomBackgroundColor());
  }, []);

  // Function to change the background color
  const changeBackgroundColor = () => {
    const newColor = getRandomBackgroundColor();
    setBgColor(newColor);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="hover:opacity-75 transition cursor-pointer">
          <IoIosArrowUp className="text-white" size={25} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0 md:hidden" />
        <Dialog.Content
          className={`fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full w-full translate-x-[-50%] translate-y-[-50%] rounded-md bg-gradient-to-b ${bgColor} p-[25px] md:hidden overflow-y-auto filter-none`}
        >
          {/* test */}
          {children}
          <Dialog.Close asChild>
            <button className="text-neutral-400 hover:text-white absolute top-[30px] left-[30px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none cursor-pointer">
              <IoIosArrowDown size={45} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogPlayer;
