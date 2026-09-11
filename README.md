# TilBlog — Today I Learned

> Lessons distilled from asking questions to LLMs.

A personal TIL blog: each post captures what clicked after a back-and-forth with a language model — the framing that worked, the gotcha that didn't, and the mental model worth keeping.

**Stack:** [Eleventy](https://www.11ty.dev/) · [Tailwind CSS](https://tailwindcss.com/) · [Alpine.js](https://alpinejs.dev/) · [Supabase](https://supabase.com/) (comments) · [Vercel](https://vercel.com/) (hosting)

---

## Quick start

```bash
npm install
cp .env.example .env   # optional — fill in for local comment testing
npm run dev            # preview → http://localhost:8080
npm run build          # production → dist/
```

---

## Project layout

```text
TilBlog-TodayILearned/
├── eleventy.config.js      # 11ty + Tailwind (PostCSS) + Alpine (esbuild)
├── vercel.json             # static deploy → dist/
├── supabase/migrations/    # comments table + RLS
├── .env.example            # SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY
├── src/
│   ├── _data/              # site metadata + env.js
│   ├── _includes/layouts/  # base.njk, post.njk
│   ├── assets/
│   │   ├── css/input.css   # Tailwind entry (@theme, typography)
│   │   └── js/             # Alpine + comments (bundled → dist/assets/js/main.js)
│   ├── posts/              # Markdown TILs by track
│   ├── about.njk
│   └── index.njk
└── dist/                   # deploy / build output
```

---

## Comments (Supabase)

Guest comments on each post: name + body, held for moderation until you set `approved = true` in the Supabase Table Editor.

1. Create a Supabase project.
2. Run [`supabase/migrations/001_comments.sql`](supabase/migrations/001_comments.sql) in the SQL Editor.
3. Copy **Project URL** and the **publishable** key (`sb_publishable_…`) from Project Settings → API Keys. (Legacy `anon` still works.)
4. Locally: put them in `.env` as `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` (see `.env.example`).
5. On Vercel: add the same two env vars (Production + Preview), then redeploy so they bake into the HTML.

Do **not** put a secret / `service_role` key in the site — only the publishable (or anon) key, with RLS enabled.

Without those vars, the comments section shows a quiet “not configured” state.

**Moderate:** Table Editor → `comments` → flip `approved` to `true` for rows you want public.

---

## Deploy (Vercel)

### Test locally first

Comments work against real Supabase as soon as env is set — you do not need a Vercel project for that:

```bash
npm run dev    # uses .env / .env.local → http://localhost:8080
```

To mimic Vercel’s production build with the CLI (no dashboard import required yet):

```bash
npx vercel build          # runs npm run build into .vercel/output
npx serve .vercel/output/static   # or: npx serve dist
```

`vercel build` reads env from the shell and from `.env` / `.env.local` via Eleventy. Optional: `npx vercel link` then `npx vercel env pull` once a project exists.

Full deploy when ready: `npx vercel` (preview) or `npx vercel --prod`.

### Dashboard import

1. Import this repo in Vercel (or use the CLI above).
2. Framework preset can stay blank; `vercel.json` sets `buildCommand` to `npm run build` and `outputDirectory` to `dist`.
3. Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`.
4. Deploy. After you have a production URL, update `src/_data/site.json` → `url` from the placeholder.

---

## Why this exists

LLMs are great at answering questions. They're less great at remembering *what you actually learned*. TilBlog is the notebook for that second part: short write-ups of insights that stuck after probing, refining, and sometimes arguing with a model.

Think of it as course notes without the course — numbered tracks like **Problem Solving 101 / 102** or **Signal Processing 101 / 202**, built from real questions rather than a syllabus.

---

## What you'll find

Posts are organized by topic tracks and level:

| Track | Levels | Focus |
| --- | --- | --- |
| Problem Solving | 101, 102, … | Framing, decomposition, checking your work |
| Signal Processing | 101, 202, … | Filters, transforms, sampling, intuition |
| *(more as they appear)* | | |

Each entry aims to be:

- **Short** — one idea, not a textbook chapter  
- **Concrete** — a question, a wrong turn, a clearer way to see it  
- **Reusable** — something you can apply the next time the same shape of problem shows up  

---

## How to read

1. Browse by **track** (topic) and **level** (depth).  
2. Skim the title and takeaway; dig into the dialogue notes if you want the path, not just the destination.  
3. Treat levels as rough difficulty / order, not a hard prerequisite list.

---

## Contributing / using this yourself

This is primarily a personal log. If you're forking it as your own TIL blog:

1. Clone the repo  
2. Add posts under a simple structure (e.g. `src/posts/signal-processing/101-sampling-intuition.md`)  
3. Keep each file focused on one lesson  

Suggested post skeleton:

```markdown
# Track Level — Short title

**Takeaway:** One sentence.

## The question
What I asked (or meant to ask).

## What clicked
The insight, in plain language.

## Pitfalls
Where the model (or I) went sideways.

## Keep this
The reusable rule of thumb.
```

---

## License

Content is shared for learning. If you reuse notes, a link back is appreciated.

---

*Today I asked. Today I learned.*
