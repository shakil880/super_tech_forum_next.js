export type ForumAuthor = {
  name: string;
  email: string;
};

export type ForumComment = {
  id: string;
  content: string;
  createdAt: Date;
  createdAtLabel: string;
  author: ForumAuthor;
};

export type ForumPostSummary = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  createdAtLabel: string;
  author: ForumAuthor;
  commentCount: number;
};

export type ForumPostDetail = ForumPostSummary & {
  comments: ForumComment[];
};