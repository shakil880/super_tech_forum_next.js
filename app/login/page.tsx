import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { getForumSession } from "@/lib/auth";

type LoginPageProps = {
  searchParams?: Promise<{ registered?: string; redirectTo?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getForumSession();

  if (session?.user) {
    redirect("/");
  }

  const params = (await searchParams) ?? {};

  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col justify-center py-10">
      <div className="mx-auto w-full max-w-xl">
        <LoginForm registered={params.registered === "1"} redirectTo={params.redirectTo} />
      </div>
    </section>
  );
}