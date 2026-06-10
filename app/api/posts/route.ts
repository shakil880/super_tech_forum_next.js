import { getForumSession } from "@/lib/auth";
import { createPost, getPosts } from "@/lib/forum";
import { postSchema } from "@/lib/validators";

export async function GET() {
  const posts = await getPosts();
  return Response.json({ posts });
}

export async function POST(request: Request) {
  const session = await getForumSession();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validated = postSchema.safeParse(body);

  if (!validated.success) {
    return Response.json(
      {
        error: "Title and content are required.",
        fieldErrors: validated.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const post = await createPost({
    authorId: session.user.id,
    title: validated.data.title,
    content: validated.data.content,
  });

  return Response.json({ post }, { status: 201 });
}