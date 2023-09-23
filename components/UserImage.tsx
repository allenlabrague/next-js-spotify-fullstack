import useLoadUserImage from "@/hooks/useLoadUserImage";
import { ProfileDetails } from "@/types";
import Image from "next/image";

interface UserImageProps {
  data: ProfileDetails;
}

const UserImage: React.FC<UserImageProps> = ({ data }) => {
  const imageUrl = useLoadUserImage(data);

  return (
    <>
      <div className="relative rounded-full w-[180px] h-[180px] overflow-hidden mx-auto">
        <Image
          fill
          src={imageUrl || "/images/default.svg"}
          className="object-cover"
          alt="No images"
        />
      </div>
    </>
  );
};

export default UserImage;
