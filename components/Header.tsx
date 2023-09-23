"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import Button from "./Button";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";

import useAuthModal from "@/hooks/useAuthModal";
import Link from "next/link";

import { AiOutlinePlus } from "react-icons/ai";
import useUploadModal from "@/hooks/useUploadModal";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

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

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const [bgColor, setBgColor] = useState(getRandomBackgroundColor());

  const authModal = useAuthModal();
  const router = useRouter();
  const uploadModal = useUploadModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // Reset any playing songs
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully!");
    }
  };

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    // handle upload later

    // TODO: check for subscriptions;

    return uploadModal.onOpen();
  };

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
    <div
      className={twMerge(`h-fit bg-gradient-to-b ${bgColor} p-6`, className)}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden items-center gap-x-2">
          <Link href="/">
            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
              <HiHome className="text-black" size={20} />
            </button>
          </Link>
          <Link href="/search">
            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
              <BiSearch className="text-black" size={20} />
            </button>
          </Link>
          <button
            onClick={onClick}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <AiOutlinePlus size={20} className="text-black" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
