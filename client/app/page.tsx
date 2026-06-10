import { LandingPageClient } from "../components/landing/landing-page-client";
import { createClient } from "../utils/supabase/server";

export const metadata = {
  title: "EagerMinds Bookmarks - Organize Your Digital Mind",
  description: "The premium, keyboard-first, collaborative bookmark manager for teams and developers.",
};

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return <LandingPageClient isLoggedIn={!!user} />;
}
