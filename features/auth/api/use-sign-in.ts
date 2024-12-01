import kyInstance from "@/lib/ky";
import { useMutation } from "@tanstack/react-query";
import { SignInData } from "../schemas";
import { backendUrl } from "@/lib/constants";

export const useSignIn = () => {
  const { mutate: signin, isPending } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (values: SignInData) => {
      const data = await kyInstance.post(`${backendUrl}/api/v1/auth/login/`, {
        json: values,
      });

      return data;
    },
  });

  return { signin, isPending };
};
