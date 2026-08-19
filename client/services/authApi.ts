import { meSchema, sessionSchema } from "@football-hub/contracts";
import type { Credentials, RegisterInput } from "@football-hub/contracts";
import { apiFetch } from "@/lib/http";

export function fetchMe() {
  return apiFetch("/api/auth/me", meSchema);
}

export function loginRequest(input: Credentials) {
  return apiFetch("/api/auth/login", sessionSchema, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export function registerRequest(input: RegisterInput) {
  return apiFetch("/api/auth/register", sessionSchema, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export function logoutRequest() {
  return apiFetch("/api/auth/logout", meSchema, { method: "POST" });
}
