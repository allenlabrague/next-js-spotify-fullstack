"use client";

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";

const LyricsContent = ({ data }) => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  if (!song) {
    return (
      <p className="leading-relaxed font-bold text-2xl md:text-3xl md:leading-relaxed lg:leading-relaxed lg:text-4xl">
        Lyrics not found
      </p>
    );
  }

  if (song.lyrics.length === 0) {
    return (
      <>
        <p className="leading-relaxed font-bold text-2xl md:text-3xl md:leading-relaxed lg:leading-relaxed lg:text-4xl">
          Lyrics not found
        </p>
        <p className="text-neutral-400 font-semibold mt-10">
          Posted by: {song.creator_song}
        </p>
      </>
    );
  }

  return (
    <>
      <p className="leading-relaxed font-bold text-2xl md:text-3xl md:leading-relaxed lg:leading-relaxed lg:text-4xl">
        {song?.lyrics}
      </p>
      <p className="text-neutral-400 font-semibold mt-10">
        Posted by: {song.creator_song ? song.creator_song : "Unknown"}
      </p>
    </>
  );
};

export default LyricsContent;
