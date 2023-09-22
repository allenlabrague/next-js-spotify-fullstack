"use client";

import { useCallback, useEffect, useState } from "react";
import Avatar from "./Avatar";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { ProfileDetails } from "@/types";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<ProfileDetails>();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;
  const router = useRouter();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      let { error: supabaseError } = await supabase.from("profiles").insert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        created_at: new Date().toISOString(),
      });

      if (supabaseError) {
        setLoading(false);
        router.back();
        return toast.error(
          "Currently you can't update your profile again!, wait for more updates.👍"
        );
      }

      toast.success("Profile updated!");

      router.back();
    } catch (error) {
      toast.error("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    router.push("/");
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400 text-center">
        User not found.
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-y-4">
      <Avatar
        uid={user!.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
        }}
      />
      <Input id="email" disabled value={session?.user.email} />
      <Input
        id="fullName"
        disabled={loading}
        placeholder="Enter your full name (optional)"
        value={fullname || ""}
        onChange={(e) => setFullname(e.target.value)}
        required
      />
      <Input
        id="username"
        disabled={loading}
        placeholder="Enter your username"
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <Input
        id="website"
        disabled={loading}
        placeholder="Enter your website link"
        value={website || ""}
        onChange={(e) => setWebsite(e.target.value)}
        required
      />
      <Button
        disabled={loading}
        className="button primary block"
        onClick={() =>
          updateProfile({ fullname, username, website, avatar_url })
        }
        type="submit"
      >
        Update
      </Button>
    </form>
  );
}
