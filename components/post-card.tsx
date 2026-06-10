import Link from "next/link";

import type { ForumPostSummary } from "@/types/forum";

type PostCardProps = {
  post: ForumPostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            <span>{post.author.name}</span>
            <span aria-hidden="true">•</span>
            <span>{post.createdAtLabel}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              <Link href={`/posts/${post.id}`} className="hover:text-emerald-700">
                {post.title}
              </Link>
            </h3>
            <p className="max-h-24 overflow-hidden text-sm leading-6 text-slate-600">
              {post.content}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 sm:justify-end">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-900">
            {post.commentCount} comment{post.commentCount === 1 ? "" : "s"}
          </span>
          <Link
            href={`/posts/${post.id}`}
            className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            View post
          </Link>
        </div>
      </div>
    </article>
  );
}