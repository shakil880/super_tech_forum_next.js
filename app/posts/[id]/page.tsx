import { notFound } from "next/navigation";

import { CommentForm } from "@/components/comment-form";
import { CommentList } from "@/components/comment-list";
import { PostBody } from "@/components/post-body";
import { getForumSession } from "@/lib/auth";
import { getPostById } from "@/lib/forum";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const [post, session] = await Promise.all([
    getPostById(id),
    getForumSession(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <section className="space-y-8 py-8">
      <PostBody post={post} />
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">Comments</h2>
          <p className="mt-1 text-sm text-slate-600">
            {post.comments.length} conversation{post.comments.length === 1 ? "" : "s"}
          </p>
        </div>

        {session?.user ? (
          <CommentForm postId={post.id} />
        ) : (
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <a href="/login" className="font-semibold text-slate-950 underline">
              Sign in
            </a>{" "}
            to join the discussion.
          </div>
        )}

        <CommentList comments={post.comments} />
      </section>
    </section>
  );
}