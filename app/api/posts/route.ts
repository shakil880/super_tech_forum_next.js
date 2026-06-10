import { getForumSession } from "@/lib/auth";
import { createPost, getPosts } from "@/lib/forum";
import { postSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const posts = await getPosts();
    return Response.json({ posts });
  } catch (error) {
    console.error("Failed to load posts", error);
    return Response.json({ error: "Unable to load posts." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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
  } catch (error) {
    console.error("Failed to create post", error);

    return Response.json({ error: "Unable to create the post." }, { status: 500 });
  }
}
