import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "../store/user-store";

export const useGetCurrentUser = () => {
  const user = useUserStore((state) => state.user);
  const { data: currentUser, isPending } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const data = await kyInstance
        .get(`${backendUrl}/api/v1/users/${user.id}`, {
          credentials: "include",
        })
        .json();

      return data;
    },
  });

  return { currentUser, isPending };
};
