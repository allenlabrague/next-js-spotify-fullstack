"use client";

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";

const LyricsContent = ({ data }) => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  return (
    <>
      <p className="leading-relaxed font-bold text-2xl md:text-3xl md:leading-relaxed lg:leading-relaxed lg:text-4xl">
        {song?.lyrics}
      </p>
    </>
  );
};

export default LyricsContent;
