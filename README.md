<div align="center">
  <img src="https://i.imgur.com/nJgq78f.png" alt="Memoriant Logo" width="120"/>
  <h1>Memoriant — Personal Bookmark Vault</h1>
  <p><em>A premium, test-driven personal bookmark vault—built like a hybrid of Linktree and Pocket.</em></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js%2016-Black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
  <p>
    Engineered to provide rock-solid data isolation, clean privacy controls, and great mobile ergonomics. <br/>
    <em>Developed as the final build task for the EagerMinds Software Developer Assessment.</em>
  </p>
</div>

---

## 🚀 Live Links & Recording

| Resource | Link |
| --- | --- |
| **Live Production URL** | `[DEPLOYED_URL]` |
| **GitHub Repository** | [bishwajit-sharma101/memoriant](https://github.com/bishwajit-sharma101/memoriant) |
| **AI Agent Checkpoint Branch** | `entire/checkpoints/v1` (Tracked via Entire CLI) |

---

## 🧠 AI-Assisted Development Workflow

This application was engineered using an iterative, dual-layered AI-assisted development workflow combined with rigorous human steering and manual audits:

- **Gemini CLI:** Employed as the primary driver for core implementation workflows, database/backend architecture design, authentication logic, Supabase integrations, automated testing scripts, and terminal-recorded checkpoints.
- **Editor-Integrated AI (Gemini 3.5 Flash):** Leveraged directly within the IDE editor to accelerate layout styling iterations, micro-animations, mobile responsiveness adjustments, and design exploration.
- **CLI Checkpoint Scope:** The automated CLI recording session (`Entire CLI`) tracked commands and changes initiated within CLI agent sessions. Refinements performed via editor panel assistants are fully integrated into the code, though they fall outside the recorded CLI checkpoints history.
- **Validation & Integration:** All code suggestions from both interfaces were systematically reviewed, refactored for Next.js conventions, manually test-verified, and integrated into a cohesive codebase.

This project highlights a productive combination of automated generation, manual code validation, and iterative design correction.

---

## 🛠️ Local Development Setup

### 1. Clone & Install
```bash
git clone https://github.com/bishwajit-sharma101/memoriant.git
cd memoriant
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_PUBLISHABLE_KEY
```

### 3. Database Initialization
Run the code provided in `schema.sql` inside your Supabase SQL Editor to set up tables, security policies, and triggers.

### 4. Compile & Boot
```bash
npm run dev    # Start the local development server at localhost:3000
npm run build  # Verify production build (Compiles with 0 warnings)
```

---

## 🧪 Verification & Quality Assurance

To ensure the system's security boundaries, username constraints, and user experience cannot be bypassed or compromised, we implemented both automated suites and manual end-to-end verification.

### 1. Database-Level RLS Verification
```bash
node test-security.js
```
- **`PASS:`** Confirms that anonymous read/write/delete attempts on private data are blocked.
- **`PASS:`** Asserts that logged-out visitors can strictly see explicitly marked public bookmarks.

### 2. Username Handle Unit Tests
```bash
node test-handles.js
```
- **`PASS:`** Runs 13 distinct assertions verifying formatting, lowercasing, and symbol-stripping.
- **`PASS:`** Blocks registration attempts on reserved application paths (like `admin`, `signin`, `memoriant`) to prevent routing collisions.

### 3. Manual E2E Quality Assurance
- **`PASS:`** Verified complete user sign-up, sign-in, session recovery, and path redirections.
- **`PASS:`** Validated Bookmark CRUD operations and instant public/private visibility toggle logic.
- **`PASS:`** Confirmed responsive, mobile-first design, including cross-device layout rendering and collapsible menus.

---

## 🔒 Security Architecture Matrix

Security is enforced directly at the database layer rather than just hiding things in the UI.

| Operation | Target Table | Policy Logic | Prevention Boundary |
| :--- | :--- | :--- | :--- |
| **`SELECT`** | `bookmarks` | `(is_public = true) OR (auth.uid() = user_id)` | Prevents users from sniffing other people's private links. |
| **`INSERT`** | `bookmarks` | `auth.uid() = user_id` | Prevents writing data into another user's profile. |
| **`UPDATE`** | `bookmarks` | `auth.uid() = user_id` | Blocks unauthorized modifications of external data. |
| **`DELETE`** | `bookmarks` | `auth.uid() = user_id` | Prevents deleting bookmarks via direct API manipulation. |

### Input Size & XSS Safeguards: 
Inputs are validated on length (max 100 characters for names, 72 for passwords) to protect against overload attempts. Malicious link protocols like `javascript:` are automatically blocked to prevent stored XSS vulnerabilities.

---

## 🤖 AI Coding Agent Steering & Course Correction

> **Verification & Steering Approach:**  
> A key part of this project was validating AI-generated implementations rather than accepting them at face value. Throughout development, I encountered several situations where generated solutions appeared correct but contained incorrect assumptions, edge-case failures, or flawed behavior. The following examples demonstrate how those issues were identified, investigated, and corrected.

### 1. PostgREST 406 vs. 409 Response Handling
- **The Error:** During development, Supabase/PostgREST returned several unexpected responses involving `406` (Not Acceptable) and `409` (Conflict) status codes. The initial AI-generated implementation incorrectly treated multiple distinct response scenarios as identical failures, leading to confusing user flows and brittle error handling.
- **The Correction:** I investigated the PostgREST response behavior, differentiated between missing records, constraint conflicts, and duplicate resource scenarios, and updated the handling logic to respond correctly to each status code.

### 2. Duplicate Signup Detection
- **The Error:** When email enumeration protection is enabled on the Supabase Auth dashboard, registration attempts for duplicate emails return a successful-looking response. The original AI-generated flow incorrectly assumed a new account was created and proceeded as if user onboarding succeeded.
- **The Correction:** I implemented explicit duplicate-account verification on the signup flow, capturing the silent pre-existing registrations and surfacing a clear error message directing users to sign in instead.

### 3. Dashboard Data Isolation Bug
- **The Error:** While auditing dashboard queries, I discovered that public bookmarks from other users could appear in dashboard results under certain query filtering conditions. While private data remained protected by database-level Row Level Security (RLS), the frontend UI still fetched and presented incorrect dashboard rows.
- **The Correction:** I added explicit authenticated-user filters (`auth.uid() = user_id`) to the client queries and validated the isolated behavior across multiple accounts.

> [!NOTE]  
> **Why These Examples Matter:**  
> The goal was not simply to generate code faster, but to identify incorrect assumptions made by AI-generated implementations, trace issues to their root causes, and guide the system toward correct, secure, and production-ready solutions.

---

## 🔮 Future Improvements with More Time

- **Dynamic Metadata Scraping:** Add a Supabase Edge Function to automatically scrape saved URLs in the background to fetch Open Graph titles, descriptions, and site favicons automatically.
- **Drag-and-Drop Reordering:** Integrate `@hello-pangea/dnd` so users can easily click and drag to change the order of links on their public profile pages.

---

## 👨‍💻 Author

**Bishwajit Sharma**
- **Profile:** BCA Student | Aspiring Full Stack Software Engineer
- **Focus:** High-performance web layouts, secure databases, and AI-assisted development workflows.