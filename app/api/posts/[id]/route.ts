import { getPostById } from "@/lib/forum";

type PostRouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: PostRouteProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return Response.json({ error: "Post not found." }, { status: 404 });
  }

  return Response.json({ post });
}