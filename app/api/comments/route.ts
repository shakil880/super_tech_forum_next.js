import { getForumSession } from "@/lib/auth";
import { createComment } from "@/lib/forum";
import { commentSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await getForumSession();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validated = commentSchema.safeParse(body);

  if (!validated.success) {
    return Response.json(
      {
        error: "Comment content is required.",
        fieldErrors: validated.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const comment = await createComment({
    authorId: session.user.id,
    content: validated.data.content,
    postId: validated.data.postId,
  });

  return Response.json({ comment }, { status: 201 });
}