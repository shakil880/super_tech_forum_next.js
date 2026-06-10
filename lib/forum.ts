import { prisma } from "@/lib/prisma";
import type { ForumComment, ForumPostDetail, ForumPostSummary } from "@/types/forum";

function formatAuthor(name: string | null, email: string) {
  return name?.trim() ? name : email;
}

function formatDate(date: Date) {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function toSummary(post: {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: { name: string | null; email: string };
  _count: { comments: number };
}): ForumPostSummary {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    createdAtLabel: formatDate(post.createdAt),
    author: {
      name: formatAuthor(post.author.name, post.author.email),
      email: post.author.email,
    },
    commentCount: post._count.comments,
  };
}

function toComment(comment: {
  id: string;
  content: string;
  createdAt: Date;
  author: { name: string | null; email: string };
}): ForumComment {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    createdAtLabel: formatDate(comment.createdAt),
    author: {
      name: formatAuthor(comment.author.name, comment.author.email),
      email: comment.author.email,
    },
  };
}

export async function getPosts(): Promise<ForumPostSummary[]> {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {

      author: {
        select: {
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return posts.map(toSummary);
}

export async function getPostById(id: string): Promise<ForumPostDetail | null> {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      comments: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  if (!post) {
    return null;
  }

  return {
    ...toSummary(post),
    comments: post.comments.map(toComment),
  };
}

export async function createPost(input: { authorId: string; title: string; content: string }) {
  const post = await prisma.post.create({
    data: {
      title: input.title,
      content: input.content,
      authorId: input.authorId,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return toSummary(post);
}

export async function createComment(input: { postId: string; authorId: string; content: string }) {
  const comment = await prisma.comment.create({
    data: {
      content: input.content,
      postId: input.postId,
      authorId: input.authorId,
    },
    include: {

      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return toComment(comment);
}

