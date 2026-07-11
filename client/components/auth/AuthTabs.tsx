"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@base-ui/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { YandexButton, Field, Divider } from "./UI";

const loginSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(8, "Минимальная длина - 8 символов"),
});

type LoginForm = z.infer<typeof loginSchema>;

const registerSchema = z
  .object({
    nickname: z
      .string()
      .min(5, "Минимальная длина - 5 символов")
      .regex(/^[A-Za-z0-9]+$/, "Только латинские буквы и цифры"),

    email: z.email("Некорректный email"),

    password: z.string().min(8, "Минимальная длина - 8 символов"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmitLogin: SubmitHandler<LoginForm> = (data) =>
    console.log("LOGIN", data);
  const onSubmitRegister: SubmitHandler<RegisterForm> = (data) =>
    console.log("REGISTER", data);

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

            <Button
              type="submit"
              className={buttonVariants({
                size: "lg",
                className: "h-11 w-full rounded-xl",
              })}
            >
              Войти
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
            <Button
              type="submit"
              // onClick={() => setActiveTab("login")}
              className={buttonVariants({
                size: "lg",
                className: "h-11 w-full rounded-xl",
              })}
            >
              Зарегистрироваться
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
