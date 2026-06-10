import { redirect } from "next/navigation";

import { PostForm } from "@/components/post-form";
import { getForumSession } from "@/lib/auth";

export default async function NewPostPage() {
  const session = await getForumSession();

  if (!session?.user) {
    redirect("/login?redirectTo=/posts/new");
  }

  return (
    <section className="py-8">
      <PostForm />
    </section>
  );
}