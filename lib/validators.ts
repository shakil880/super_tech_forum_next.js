import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(120, "Keep the title under 120 characters."),
  content: z
    .string()
    .trim()
    .min(1, "Content is required.")
    .max(5000, "Keep the post under 5000 characters."),
});

export const commentSchema = z.object({
  postId: z.string().min(1, "Post id is required."),
  content: z
    .string()
    .trim()
    .min(1, "Comment content is required.")
    .max(2000, "Keep the comment under 2000 characters."),
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(60, "Keep the name under 60 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});