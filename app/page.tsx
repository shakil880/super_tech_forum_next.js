import Link from "next/link";

import { PostCard } from "@/components/post-card";
import { getForumSession } from "@/lib/auth";
import { getPosts } from "@/lib/forum";
import { ForumMark } from "@/components/forum-mark";

export default async function Home() {
  const [posts, session] = await Promise.all([
    getPosts().catch((error) => {
      console.error("Failed to load homepage posts", error);
      return [];
    }),
    getForumSession(),
  ]);

  const isAuthenticated = Boolean(session?.user);

  return (
    <section className="space-y-8 pb-8 pt-4 sm:pt-8">
      <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">
              Super Tech Forum
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              A clean, beginner-friendly forum for developers, built with Next.js and Neon.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Register, sign in, publish posts, and join the conversation with comments.
              The app keeps the stack simple: App Router, Prisma, NextAuth, and Tailwind CSS.
            </p>
          </div>

          <div className="flex justify-start lg:justify-end">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-inner">
              <ForumMark className="h-24 w-24 sm:h-28 sm:w-28" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/posts/new"
            className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Create a post
          </Link>
          <Link
            href={isAuthenticated ? "/posts/new" : "/register"}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            {isAuthenticated ? "Go to editor" : "Join the forum"}
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Latest posts
          </h2>
          <p className="mt-1 text-sm text-slate-600">Newest conversations first.</p>
        </div>
        <Link
          href="/login"
          className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
        >
          {isAuthenticated ? "Signed in" : "Sign in"}
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-600">
          No posts yet. Create the first one to start the forum.
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
