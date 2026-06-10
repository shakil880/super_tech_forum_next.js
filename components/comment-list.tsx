import type { ForumComment } from "@/types/forum";

type CommentListProps = {
  comments: ForumComment[];
};

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
        No comments yet. Add the first reply.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <article key={comment.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            <span>{comment.author.name}</span>
            <span aria-hidden="true">•</span>
            <span>{comment.createdAtLabel}</span>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{comment.content}</p>
        </article>
      ))}
    </div>
  );
}