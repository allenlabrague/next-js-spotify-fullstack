import Header from "@/components/Header";
import ProfileContent from "./components/ProfileContent";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Profile from "@/components/Profile";
import getUser from "@/actions/getUser";

export const revalidate = 0;

const Account = async () => {
  const userSongs = await getSongsByUserId();
  const userProfiles = await getUser();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <Profile users={userProfiles} />
      </Header>
      <ProfileContent songs={userSongs} />
    </div>
  );
};

export default Account;
