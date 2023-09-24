import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import getSongs from "./getSongs";

const getSongsByLyrics = async (lyrics: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!lyrics) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("title", lyrics)
    .single();

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getSongsByLyrics;
