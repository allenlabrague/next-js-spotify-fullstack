import { ProfileDetails } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getUser = async (): Promise<ProfileDetails[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", sessionData.session?.user.id);

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getUser;
