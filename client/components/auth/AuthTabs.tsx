"use client";

import Link from "next/link";
import { useState } from "react";
import { LockKeyhole, Mail, UserRound } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@base-ui/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Field({
  id,
  label,
  type,
  placeholder,
  icon: Icon,
}: {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  placeholder: string;
  icon: typeof Mail;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="h-11 rounded-xl border-border bg-background pl-10"
        />
      </div>
    </div>
  );
}

function YandexButton() {
  return (
    <Link
      href="/lk"
      className={buttonVariants({
        variant: "outline",
        size: "lg",
        className: "h-11 w-full rounded-xl",
      })}
    >
      <span className="flex size-5 items-center justify-center rounded-full bg-[#fc3f1d] text-xs font-bold text-white">
        Я
      </span>
      Войти с Яндекс ID
    </Link>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">или</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <Tabs
      defaultValue="login"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full gap-6"
    >
      <TabsList className="grid h-11 w-full grid-cols-2 rounded-xl">
        <TabsTrigger value="login" className="rounded-lg">
          Войти
        </TabsTrigger>
        <TabsTrigger value="register" className="rounded-lg">
          Регистрация
        </TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              С возвращением
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Войдите, чтобы открыть профиль и будущее избранное.
            </p>
          </div>

          <YandexButton />
          <Divider />

          <div className="flex flex-col gap-4">
            <Field
              id="login-email"
              label="Почта"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
            />
            <Field
              id="login-password"
              label="Пароль"
              type="password"
              placeholder="Введите пароль"
              icon={LockKeyhole}
            />
          </div>

          <Link
            href="/lk"
            className={buttonVariants({
              size: "lg",
              className: "h-11 w-full rounded-xl",
            })}
          >
            Войти
          </Link>

          <Button
            onClick={() => {
              setActiveTab("register");
            }}
            className="text-center underline underline-offset-2 text-sm text-muted-foreground"
          >
            Нет аккаунта? Зарегистрироваться
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="register">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Создать аккаунт
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Зарегистрируйтесь, чтобы позже сохранять команды, игроков и
              новости.
            </p>
          </div>

          <YandexButton />
          <Divider />

          <div className="flex flex-col gap-4">
            <Field
              id="register-name"
              label="Никнейм"
              type="text"
              placeholder="Ваш никнейм"
              icon={UserRound}
            />
            <Field
              id="register-email"
              label="Почта"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
            />
            <Field
              id="register-password"
              label="Пароль"
              type="password"
              placeholder="Придумайте пароль"
              icon={LockKeyhole}
            />
          </div>

          <button
            type='button'
            onClick={() => setActiveTab('login')}
            className={buttonVariants({
              size: "lg",
              className: "h-11 w-full rounded-xl",
            })}
          >
            Зарегистрироваться
          </button>

          <Button onClick={() => setActiveTab('login')} className="text-center underline underline-offset-2 text-sm text-muted-foreground">
            Уже есть аккаунт? Войти
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
