import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import { unstable_rethrow } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";

type ForumToken = {
  sub?: string;
  name?: string | null;
  email?: string | null;
};

type ForumSession = {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
};

export const authOptions = {
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login" as const,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const validated = loginSchema.safeParse(credentials);

          if (!validated.success) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: validated.data.email,
            },
          });

          if (!user) {
            console.warn("Login failed: user not found", {
              email: validated.data.email,
            });
            return null;
          }

          const passwordMatches = await bcrypt.compare(validated.data.password, user.password);
          if (!passwordMatches) {
            console.warn("Login failed: password mismatch", {
              email: validated.data.email,
            });
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Login failed: database error", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: ForumToken; user?: ForumSession["user"] }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }: { session: ForumSession; token: ForumToken }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export type ForumSessionResult = ForumSession | null;

export async function getForumSession() {
  try {
    return (await getServerSession(authOptions)) as ForumSessionResult;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Failed to load session", error);
    return null;
  }
}
