import getSongsByLyrics from "@/actions/getSongByLyrics";
import Header from "@/components/Header";
import LyricsContent from "./components/LyricsContent";
import getSong from "@/actions/getSong";

export const revalidate = 0;

interface LyricsProps {
  searchParams: {
    lyrics: string;
  };
}

const Lyrics = async ({ searchParams }: LyricsProps) => {
  const songLyrics = await getSongsByLyrics(searchParams.lyrics);
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <LyricsContent data={songLyrics} />
      </Header>
    </div>
  );
};

export default Lyrics;
``;
