export default function PublicProfileLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans flex justify-center py-12 px-4 sm:py-24 select-none animate-pulse">
      <div className="w-full max-w-[340px] flex flex-col items-center">
        {/* Avatar Skeleton */}
        <div className="h-20 w-20 rounded-full bg-stone-200 border-4 border-white shadow-md" />
        
        {/* Name & Handle Skeleton */}
        <div className="h-4 w-36 bg-stone-200 rounded-md mt-5" />
        <div className="h-3 w-20 bg-stone-200/60 rounded-md mt-2" />

        {/* Link Cards Skeleton */}
        <div className="w-full flex flex-col gap-3 mt-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full h-[76px] rounded-2xl bg-white border border-stone-200/50 shadow-sm flex flex-col gap-2 p-4"
            >
              <div className="h-3.5 w-2/3 bg-stone-200/70 rounded-md" />
              <div className="h-2.5 w-1/3 bg-stone-200/40 rounded-md" />
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="mt-16 h-3.5 w-24 bg-stone-200/40 rounded-md" />
      </div>
    </div>
  );
}
