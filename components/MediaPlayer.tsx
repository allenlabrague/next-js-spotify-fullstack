"use client";

import { Song } from "@/types";
import { twMerge } from "tailwind-merge";

interface MediaPlayerProps {
  data: Song;
  onClick?: (id: string) => void;
  className?: string;
  children?: React.ReactNode;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  data,
  onClick,
  className,
  children,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // TODO: Default turn on player
  };
  return <div onClick={handleClick}>{children}</div>;
};

export default MediaPlayer;
