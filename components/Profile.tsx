"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import Button from "./Button";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  if (!user) {
    router.push("/");
  }

  // Check if the user object exists and has an email property
  const email = user?.email;

  // Extract the part of the email address before "@" symbol
  const emailWithoutDomain = email?.split("@")[0];

  // Remove numeric characters from the email part
  const emailWithoutNumbers = emailWithoutDomain?.replace(/\d+/g, "");

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

  return (
    <>
      {user ? (
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                fill
                src="/images/default.svg"
                alt="liked-image"
                className="object-cover rounded-full bg-white p-1"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Profile</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold my-2">
                {emailWithoutNumbers}
              </h1>
              <div className="flex items-center gap-x-4">
                <Link href="/account/edit-account">
                  <Button className="bg-white py-1 px-1 w-[100px] text-sm">
                    Edit profile
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  className="bg-white py-1 px-1 w-[100px] text-sm"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-white text-3xl font-semibold">User not found.</h1>
      )}
    </>
  );
};

export default Profile;
