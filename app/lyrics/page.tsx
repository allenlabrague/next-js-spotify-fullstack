import Header from "@/components/Header";
import LyricsContent from "./components/LyricsContent";
import getUser from "@/actions/getUser";

export const revalidate = 0;

const Lyrics = async () => {
  const user = getUser();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <LyricsContent data={user} />
      </Header>
    </div>
  );
};

export default Lyrics;
``;
