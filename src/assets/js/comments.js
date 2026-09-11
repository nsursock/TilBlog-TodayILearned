import { createClient } from "@supabase/supabase-js";

function getClient() {
  const cfg = window.__SUPABASE__;
  if (!cfg?.url || !cfg?.anonKey) return null;
  return createClient(cfg.url, cfg.anonKey);
}

export function commentsComponent(postSlug) {
  return {
    postSlug,
    comments: [],
    authorName: "",
    body: "",
    website: "", // honeypot
    loading: true,
    submitting: false,
    unavailable: false,
    submitted: false,
    error: "",

    async init() {
      const client = getClient();
      if (!client) {
        this.unavailable = true;
        this.loading = false;
        return;
      }

      try {
        const { data, error } = await client
          .from("comments")
          .select("id, author_name, body, created_at")
          .eq("post_slug", this.postSlug)
          .eq("approved", true)
          .order("created_at", { ascending: true });

        if (error) throw error;
        this.comments = data ?? [];
      } catch (err) {
        console.error(err);
        this.error = "Could not load comments.";
      } finally {
        this.loading = false;
      }
    },

    formatDate(iso) {
      if (!iso) return "";
      return new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(iso));
    },

    async submit() {
      this.error = "";
      if (this.website) {
        this.submitted = true;
        return;
      }

      const name = this.authorName.trim();
      const text = this.body.trim();
      if (name.length < 2 || name.length > 80) {
        this.error = "Name must be 2–80 characters.";
        return;
      }
      if (text.length < 1 || text.length > 2000) {
        this.error = "Comment must be 1–2000 characters.";
        return;
      }

      const client = getClient();
      if (!client) {
        this.unavailable = true;
        return;
      }

      this.submitting = true;
      try {
        const { error } = await client.from("comments").insert({
          post_slug: this.postSlug,
          author_name: name,
          body: text,
          approved: false,
        });
        if (error) throw error;
        this.submitted = true;
        this.authorName = "";
        this.body = "";
      } catch (err) {
        console.error(err);
        this.error = "Could not submit. Try again in a moment.";
      } finally {
        this.submitting = false;
      }
    },
  };
}
