import Link from "next/link";

import AuthTabs from "@/components/auth/AuthTabs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход и регистрация",
};

export default function AuthPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-lg items-center px-4 py-8 sm:px-6">
      <section className="w-full rounded-xl border bg-card p-6 sm:p-8">
        <div className="mb-7 text-center">
          <Link href="/" className="text-sm font-semibold uppercase">
            Football Hub
          </Link>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Личный кабинет
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Одна учетная запись для персонального футбольного пространства.
          </p>
        </div>

        <AuthTabs />
      </section>
    </div>
  );
}
