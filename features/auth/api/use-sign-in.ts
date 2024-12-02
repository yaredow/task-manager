import kyInstance from "@/lib/ky";
import { useMutation } from "@tanstack/react-query";
import { SignInData } from "../schemas";
import { backendUrl } from "@/lib/constants";
import useUserStore from "../store/user-store";
import { AuthResponse } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const useSignIn = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const { mutate: signin, isPending } = useMutation<
    AuthResponse,
    Error,
    SignInData
  >({
    mutationKey: ["loginUser"],
    mutationFn: async (values) => {
      const response = await kyInstance.post(
        `${backendUrl}/api/v1/auth/login/`,
        {
          credentials: "include",
          json: values,
        },
      );

      return await response.json();
    },
    onSuccess: (data) => {
      router.push("/");
      setUser({ ...data.user, id: data.user.pk });
    },
    onError: () => {
      toast({
        description: "Something went wrong. Please try again!",
        variant: "destructive",
      });
    },
  });

  return { signin, isPending };
};
