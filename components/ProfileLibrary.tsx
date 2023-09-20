"use client";

import MediaItem from "./MediaItem";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface ProfileLibraryProps {
  songs: Song[];
}

const ProfileLibrary: React.FC<ProfileLibraryProps> = ({ songs }) => {
  const { user } = useUser();

  const onPlay = useOnPlay(songs);

  if (user) {
    if (songs.length === 0) {
      return (
        <h1 className="text-white text-2xl font-semibold mt-7">
          No songs posted
        </h1>
      );
    }
  }

  return (
    <>
      {user ? (
        <>
          <div className="flex flex-col items-start mt-7">
            <h1 className="text-white text-2xl font-semibold">Posted music</h1>
            <p className="text-neutral-400 text-sm truncate">
              Only visible to you
            </p>
          </div>
          <div className="flex flex-col gap-y-2 mt-4 px-3">
            {songs.map((item) => (
              <MediaItem
                onClick={(id: string) => onPlay(id)}
                key={item.id}
                data={item}
              />
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ProfileLibrary;
