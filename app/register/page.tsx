import { redirect } from "next/navigation";

import { RegisterForm } from "@/components/register-form";
import { getForumSession } from "@/lib/auth";

export default async function RegisterPage() {
  const session = await getForumSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col justify-center py-10">
      <div className="mx-auto w-full max-w-xl">
        <RegisterForm />
      </div>
    </section>
  );
}