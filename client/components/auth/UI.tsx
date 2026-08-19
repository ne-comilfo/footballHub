import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

type FieldProps = {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  placeholder: string;
  icon: typeof Mail;
  register: UseFormRegisterReturn;
  error?: FieldError;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Field({
  id,
  label,
  type,
  placeholder,
  icon: Icon,
  register,
  error,
  showPassword,
  setShowPassword
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          className={`h-11 rounded-xl border-border bg-background pl-10 ${error ? "border-red-500" : ""}`}
          {...register}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>

      <p className="h-4 text-sm text-red-500 h-4">{error?.message}</p>
    </div>
  );
}

export function YandexButton() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <div>
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled
              className="h-11 w-full rounded-xl"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-[#fc3f1d] text-xs font-bold text-white">
                Я
              </span>
              Войти с Яндекс ID
            </Button>
          </div>
        }
      />
      <TooltipContent side="top">
        Вход через Яндекс ID пока в разработке
      </TooltipContent>
    </Tooltip>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">или</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
