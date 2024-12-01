import kyInstance from "@/lib/ky";
import { useMutation } from "@tanstack/react-query";
import { SignUpData } from "../schemas";
import { backendUrl } from "@/lib/constants";

export const useSignUp = () => {
  const { mutate: signup, isPending } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (values: SignUpData) => {
      const data = await kyInstance.post(
        `${backendUrl}/api/v1/auth/registration/`,
        {
          json: values,
        },
      );

      return data;
    },
  });

  return { signup, isPending };
};
