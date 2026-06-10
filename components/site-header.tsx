import Link from "next/link";

import { getForumSession } from "@/lib/auth";
import { ForumMark } from "./forum-mark";
import { LogoutButton } from "./logout-button";

export async function SiteHeader() {
  const session = await getForumSession();

  return (
    <header className="sticky top-0 z-10 mb-6 rounded-3xl border border-white/70 bg-white/80 px-4 py-4 shadow-[0_10px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <ForumMark className="h-11 w-11 shrink-0" />
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight text-slate-950">
              Super Tech Forum
            </Link>
            <p className="text-sm text-slate-600">A clean place for tech discussions and ideas.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/posts/new"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            New post
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <span className="hidden sm:inline">{session.user.name ?? session.user.email}</span>
              <LogoutButton />
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-slate-700 transition hover:text-slate-950">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}