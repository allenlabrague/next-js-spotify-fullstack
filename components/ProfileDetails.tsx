import { ProfileDetails } from "@/types";
import Link from "next/link";
import { AiOutlineLink } from "react-icons/ai";

interface ProfileUserDetailsProps {
  users: ProfileDetails;
}

const ProfileUserDetails: React.FC<ProfileUserDetailsProps> = ({ users }) => {
  if (!users.website && !users.username) {
    return (
      <>
        <div className="flex flex-col my-3">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-2 text-center md:text-left">
            No username
          </h1>
          <div className="flex gap-x-2 text-neutral-400 hover:underline items-center mt-1 text-center md:text-left">
            <AiOutlineLink />
            <div className="w-[300px] truncate">
              <h2 className="text-left">
                Click Edit profile to create your information.
              </h2>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col my-3">
        <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-2 text-center md:text-left">
          {users.username}
        </h1>
        <Link
          href={users.website}
          target="_blank"
          className="w-[300px] truncate flex items-center gap-x-2 justify-center text-neutral-400 hover:underline hover:opacity-70 md:justify-start"
        >
          <AiOutlineLink />
          <h2 className="text-left">{users.website}</h2>
        </Link>
      </div>
    </>
  );
};

export default ProfileUserDetails;
