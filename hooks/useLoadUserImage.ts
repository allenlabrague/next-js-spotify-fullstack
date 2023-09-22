import { ProfileDetails } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadUserImage = (image: ProfileDetails) => {
  const supabaseClient = useSupabaseClient();

  if (!image) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("avatars")
    .getPublicUrl(image.avatar_url);

  return imageData.publicUrl;
};

export default useLoadUserImage;
