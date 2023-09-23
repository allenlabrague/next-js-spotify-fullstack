import useLoadUserImage from "@/hooks/useLoadUserImage";
import Image from "next/image";

const UserImage = ({ data }) => {
  const imageUrl = useLoadUserImage(data);

  if (!data.avatar_url) {
    return (
      <div className="relative rounded-full w-[180px] h-[180px] overflow-hidden mx-auto bg-white">
        <Image
          fill
          src={"/images/default.svg"}
          className="object-cover p-8"
          alt="No images"
        />
      </div>
    );
  }

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
