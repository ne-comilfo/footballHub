import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { Credentials, RegisterInput, User } from "@football-hub/contracts";

import { queryKeys } from "@/lib/queryKeys";
import {
  fetchMe,
  loginRequest,
  logoutRequest,
  registerRequest,
} from "@/services/authApi";

export function useMe() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => (await fetchMe()).user,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

function useAuthSuccess() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return (user: User) => {
    queryClient.setQueryData(queryKeys.auth.me(), user);
    router.replace("/lk");
    router.refresh();
  };
}

export function useLogin() {
  const onSuccess = useAuthSuccess();

  return useMutation({
    mutationFn: (input: Credentials) => loginRequest(input),
    onSuccess: (data) => onSuccess(data.user),
  });
}

export function useRegister() {
  const onSuccess = useAuthSuccess();

  return useMutation({
    mutationFn: (input: RegisterInput) => registerRequest(input),
    onSuccess: (data) => onSuccess(data.user),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.me(), null);
      queryClient.clear();
      router.replace("/");
      router.refresh();
    },
  });
}
