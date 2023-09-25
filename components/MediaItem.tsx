"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
  className?: string;
  children?: React.ReactNode;
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick,
  className,
  children,
}) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // TODO: Default turn on player
  };
  return (
    <div
      onClick={handleClick}
      className={twMerge(
        `flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md`,
        className
      )}
    >
      {children}
      <div className="relative rounded-md min-h-[40px] min-w-[40px] overflow-hidden">
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          className="object-cover"
          alt="Media Item"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden w-[150px] lg:w-full">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
