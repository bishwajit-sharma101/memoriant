import { LandingPageClient } from "../components/landing/landing-page-client";
import { createClient } from "../utils/supabase/server";

export const metadata = {
  title: "EagerMinds Bookmarks - Organize Your Digital Mind",
  description: "The premium, keyboard-first, collaborative bookmark manager for teams and developers.",
};

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let handle = "";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("handle")
      .eq("id", user.id)
      .single();
    if (profile) handle = profile.handle;
  }
  
  return <LandingPageClient isLoggedIn={!!user} userEmail={user?.email} userName={user?.user_metadata?.full_name || user?.user_metadata?.name || undefined} userHandle={handle} />;
}
