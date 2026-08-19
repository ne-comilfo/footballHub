"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  credentialsSchema,
  registerFormSchema,
  type Credentials,
  type RegisterForm,
} from "@football-hub/contracts";

import { useLogin, useRegister } from "@/hooks/useAuth";

import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@base-ui/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { YandexButton, Field, Divider } from "./UI";

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const login = useLogin();
  const register = useRegister();

  const loginForm = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
  });
  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmitLogin: SubmitHandler<Credentials> = (data) =>
    login.mutate(data);

  const onSubmitRegister: SubmitHandler<RegisterForm> = ({
    confirmPassword: _confirmPassword,
    ...input
  }) => register.mutate(input);

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

          <form
            onSubmit={loginForm.handleSubmit(onSubmitLogin)}
            className="flex flex-col gap-4"
          >
            <Field
              id="login-email"
              label="Почта"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
              error={loginForm.formState.errors.email}
              register={loginForm.register("email")}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <Field
              id="login-password"
              label="Пароль"
              type="password"
              placeholder="Введите пароль"
              icon={LockKeyhole}
              error={loginForm.formState.errors.password}
              register={loginForm.register("password")}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            {login.error && (
              <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {login.error.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={login.isPending}
              className={buttonVariants({
                size: "lg",
                className: "h-11 w-full rounded-xl",
              })}
            >
              {login.isPending ? "Входим..." : "Войти"}
            </Button>
          </form>

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
          <form
            onSubmit={registerForm.handleSubmit(onSubmitRegister)}
            className="flex flex-col gap-4"
          >
            <Field
              id="register-name"
              label="Никнейм"
              type="text"
              placeholder="Ваш никнейм"
              icon={UserRound}
              register={registerForm.register("nickname")}
              error={registerForm.formState.errors.nickname}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <Field
              id="register-email"
              label="Почта"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
              error={registerForm.formState.errors.email}
              register={registerForm.register("email")}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <Field
              id="register-password"
              label="Пароль"
              type="password"
              placeholder="Придумайте пароль"
              icon={LockKeyhole}
              error={registerForm.formState.errors.password}
              register={registerForm.register("password")}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <Field
              id="register-password-confirmed"
              label="Пароль"
              type="password"
              placeholder="Повторите пароль"
              icon={LockKeyhole}
              register={registerForm.register("confirmPassword")}
              error={registerForm.formState.errors.confirmPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            {register.error && (
              <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {register.error.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={register.isPending}
              className={buttonVariants({
                size: "lg",
                className: "h-11 w-full rounded-xl",
              })}
            >
              {register.isPending ? "Создаём аккаунт..." : "Зарегистрироваться"}
            </Button>
          </form>

          <Button
            onClick={() => setActiveTab("login")}
            className="text-center underline underline-offset-2 text-sm text-muted-foreground"
          >
            Уже есть аккаунт? Войти
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
