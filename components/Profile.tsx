"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import Button from "./Button";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { ProfileDetails } from "@/types";
import ProfileUserDetails from "./ProfileDetails";
import UserImage from "./UserImage";

interface ProfileProps {
  users: ProfileDetails[];
}

const Profile: React.FC<ProfileProps> = ({ users }) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  if (!user) {
    router.push("/");
  }

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
            <div>
              {users.map((user) => (
                <UserImage key={user.id} data={user} />
              ))}
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Profile</p>
              <ProfileUserDetails users={users} />
              <div className="flex items-center gap-x-4 justify-center md:justify-start">
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
        <h1 className="flex flex-col gap-y-2 w-full px-6 text-neutral-400 text-center text-2xl">
          User not found.
        </h1>
      )}
    </>
  );
};

export default Profile;
