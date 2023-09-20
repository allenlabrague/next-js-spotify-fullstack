import ProfileLibrary from "@/components/ProfileLibrary";
import { Song } from "@/types";

interface ProfileContentProps {
  songs: Song[];
}

const ProfileContent: React.FC<ProfileContentProps> = ({ songs }) => {
  return <ProfileLibrary songs={songs} />;
};

export default ProfileContent;
