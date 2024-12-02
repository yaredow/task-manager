import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { backendUrl } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import kyInstance from "@/lib/ky";

import useUserStore from "../store/user-store";

export const useLogOut = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();
  const { mutate: logout, isPending } = useMutation({
    mutationKey: ["logoutUser"],
    mutationFn: async () => {
      await kyInstance.post(`${backendUrl}/api/v1/auth/logout/`, {
        credentials: "include",
      });
    },
    onSuccess: () => {
      router.push("/sign-in");
      clearUser();
    },
    onError: () => {
      toast({
        description: "Logout failed. Try again!",
      });
    },
  });

  return { logout, isPending };
};
