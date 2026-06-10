import type { ForumPostDetail } from "@/types/forum";

type PostBodyProps = {
  post: ForumPostDetail;
};

export function PostBody({ post }: PostBodyProps) {
  return (
    <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
          <span>{post.author.name}</span>
          <span aria-hidden="true">•</span>
          <span>{post.createdAtLabel}</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {post.title}
        </h1>
      </div>

      <div className="whitespace-pre-wrap text-base leading-8 text-slate-700">
        {post.content}
      </div>
    </article>
  );
}