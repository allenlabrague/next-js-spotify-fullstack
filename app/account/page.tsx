import Header from "@/components/Header";

import ProfileContent from "./components/ProfileContent";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Profile from "@/components/Profile";

export const revalidate = 0;

const Account = async () => {
  const userSongs = await getSongsByUserId();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <Profile />
        <ProfileContent songs={userSongs} />
      </Header>
    </div>
  );
};

export default Account;

// render the profile details!!
