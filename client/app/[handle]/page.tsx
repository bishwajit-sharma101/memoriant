import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function PublicProfilePage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const { handle } = params;
  
  // Setup standard server client without requiring auth
  const supabase = await createClient();

  // Fetch profile by handle
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, handle, full_name, avatar_url")
    .eq("handle", handle)
    .single();

  if (!profile) {
    notFound();
  }

  // Fetch only PUBLIC bookmarks for this user
  // (RLS handles this but explicitly filtering is good practice)
  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("id, title, url, tag, created_at")
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  const initialLetters = profile.full_name ? profile.full_name.substring(0, 2).toUpperCase() : "EM";

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans flex justify-center py-12 px-4 sm:py-24">
      <div className="w-full max-w-[340px] flex flex-col items-center">
        {/* Back Button */}
        <Link
          href="/dashboard?tab=search"
          className="self-start mb-8 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors group cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 transform transition-transform group-hover:-translate-x-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back
        </Link>

        {/* Avatar stack */}
        <div className="h-20 w-20 rounded-full bg-stone-900 border-4 border-white flex items-center justify-center text-white font-black text-xl shadow-lg">
          {initialLetters}
        </div>
        
        <h1 className="text-xl font-black tracking-tight text-stone-900 mt-5">
          {profile.full_name || `@${profile.handle}`}
        </h1>
        <p className="text-xs font-bold text-stone-400 tracking-widest mt-1 uppercase">
          @{profile.handle}
        </p>

        <div className="w-full flex flex-col gap-3 mt-10">
          {!bookmarks || bookmarks.length === 0 ? (
            <div className="text-center py-10 bg-white/50 rounded-2xl border border-stone-200/60 shadow-sm">
              <p className="text-[11px] font-bold tracking-widest text-stone-400 uppercase">
                No public links yet
              </p>
            </div>
          ) : (
            bookmarks.map((b) => {
              const cleanHost = b.url
                .replace("https://", "")
                .replace("http://", "")
                .replace("www.", "")
                .split("/")[0];

              return (
                <a
                  key={b.id}
                  href={b.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-4 rounded-2xl bg-white border border-stone-200/70 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-stone-300 transition-all duration-300 flex flex-col gap-2 group"
                >
                  <h3 className="text-sm font-black text-stone-850 group-hover:text-stone-950 transition-colors line-clamp-1">
                    {b.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                      <img
                        src={`https://www.google.com/s2/favicons?sz=64&domain=${cleanHost}`}
                        alt=""
                        className="h-3 w-3 rounded-sm filter bg-stone-100"
                      />
                      {cleanHost}
                    </span>
                    {b.tag && b.tag !== 'inbox' && (
                      <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
                        #{b.tag}
                      </span>
                    )}
                  </div>
                </a>
              );
            })
          )}
        </div>

        <div className="mt-16 text-[9px] font-black tracking-widest text-stone-300 uppercase flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <Link href="/" className="hover:text-stone-400 transition-colors">Powered by EagerMinds</Link>
        </div>
      </div>
    </div>
  );
}
