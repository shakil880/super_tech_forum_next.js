"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function PostForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const title = String(formData.get("title") ?? "").trim();
      const content = String(formData.get("content") ?? "").trim();

      if (!title || !content) {
        setError("Please fill in both the title and content.");
        return;
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = (await response.json()) as { post?: { id: string }; error?: string };

      if (!response.ok || !data.post) {
        setError(data.error ?? "Unable to create the post.");
        return;
      }

      router.push(`/posts/${data.post.id}`);
      router.refresh();
    } catch {
      setError("Something went wrong while creating the post.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Create a post</h1>
        <p className="text-sm text-slate-600">Keep it simple, clear, and useful.</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Title</span>
          <input
            name="title"
            maxLength={120}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            placeholder="Share something helpful..."
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Content</span>
          <textarea
            name="content"
            rows={10}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            placeholder="Write the post body here..."
          />
        </label>

        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Publishing..." : "Publish post"}
        </button>
      </form>
    </div>
  );
}