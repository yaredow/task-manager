import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import { UserStore } from "../types";

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>,
) => StateCreator<UserStore>;

const useUserStore = create<UserStore>(
  (persist as MyPersist)(
    (set) => ({
      user: { id: null, email: null, name: null, is_active: null },
      setUser: (user) => set({ user }),
      clearUser: () =>
        set({ user: { id: null, email: null, name: null, is_active: null } }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
