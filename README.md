# EagerMinds Bookmarks — Personal Vault & Bio Link

A premium, keyboard-first bookmarks repository (think "Linktree meets Pocket") built with Next.js 16, Tailwind CSS, and Supabase.

---

## Features

1. **Authentication & Accounts**: Secure sign-up and sign-in via email/password.
2. **Private Bookmarks Vault**: Add, edit, organize, and delete bookmarks. Supports notes, tag categories, and search filters.
3. **Robust Database-level Security (RLS)**: Enforces row-level security on Supabase so users can only read, write, edit, or delete their own data.
4. **Public Bio Profile**: Claims a unique `@handle` derived from name/email and displays public-only links at `/[handle]`.
5. **Route Protection**: Middleware dynamically protects `/dashboard` and redirects authenticated users away from `/signin` and `/signup`.
6. **Cinematic UI**: Glassmorphic styling, ambient lighting, smooth typography expansion loader, and responsive layouts.

---

## How to Run Locally

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd eagerminds-bookmarks-task/client
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file inside the `client/` directory with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Run the App
To run in development mode (with hot reloading):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To run a production build:
```bash
npm run build
npm run start
```

---

## AI Pair Programming Log (Critique & Corrections)

* **Logo Border Clashes**: During visual styling, the AI agent nested our custom leaf-shaped `logo.png` inside round `bg-stone-900` wrappers, causing double-borders. I noticed the shape mismatch and directed the agent to render the logo directly as an `object-contain` element.
* **Cached Build & Middleware**: When implementing middleware redirects for signin/signup, the changes didn't seem to apply. I realized the active `npm run start` production server process was serving cached code from an hour prior; I instructed the agent to build the project and guided it to wait for me to stop and restart the runner.
* **Database SQL Bypass**: To enforce handle regex format and reserved username lists, the agent initially proposed direct database trigger modifications. Knowing this required manual SQL edits on my Supabase dashboard, I steered the agent to intercept and validate handle generation entirely within the signup server action instead, ensuring a zero-configuration database sync.

---

## Future Improvements

With more time, I would implement **Automatic Metadata Scraping**. When a user inputs a URL, the server action would fetch the target webpage's HTML in the background and parse its `meta` tags (e.g. Open Graph tags). This would automatically populate the bookmark's title, description, and thumbnail image, creating a richer directory layout without requiring manual input.
