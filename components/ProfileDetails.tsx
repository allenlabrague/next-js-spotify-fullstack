import { ProfileDetails } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLink } from "react-icons/ai";

interface ProfileUserDetailsProps {
  users: ProfileDetails[];
}

const ProfileUserDetails: React.FC<ProfileUserDetailsProps> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="flex flex-col my-3">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-2 text-center md:text-left">
            {user.username}
          </h1>
          <Link
            href={user.website}
            target="_blank"
            className="flex gap-x-2 text-neutral-400 hover:underline items-center mt-1 text-center md:text-left"
          >
            <AiOutlineLink />
            <h2>{user.website}</h2>
          </Link>
          {!user.website && <div>no username</div>}
        </div>
      ))}
    </div>
  );
};

export default ProfileUserDetails;
