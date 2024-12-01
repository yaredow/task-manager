import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  const { data: currentUser, isPending } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const data = await kyInstance
        .get(`${backendUrl}/api/v1/auth/user/`, {
          credentials: "include",
        })
        .json();

      return data;
    },
  });

  return { currentUser, isPending };
};
