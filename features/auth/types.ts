export type UserState = {
  id: string | null;
  email: string | null;
  name: string | null;
  is_active: boolean | null;
};

export type UserStore = {
  user: UserState;
  setUser: (user: UserState) => void;
  clearUser: () => void;
};

export type AuthResponse = {
  access: string;
  refresh: string;
  user: {
    email: string;
    pk: string;
    name: string;
    is_active: boolean;
  };
};
