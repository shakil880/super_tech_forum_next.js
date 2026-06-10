import { getForumSession } from "@/lib/auth";
import { createComment } from "@/lib/forum";
import { commentSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
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
  } catch (error) {
    console.error("Failed to create comment", error);

    return Response.json({ error: "Unable to create the comment." }, { status: 500 });
  }
}
