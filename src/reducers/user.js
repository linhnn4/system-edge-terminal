import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  isLoggedIn: false,
  signupInfo: null,
  accessToken: null,
  refreshToken: null,
};

const useUser = create(
  persist(
    (set, get) => ({
      user: initialState,
      logout: async () => {
        set({ user: initialState });
      },
      updateUser: async (data) => {
        set({ user: { ...get().user, ...data } });
      },
      updateSignupInfo: async (data) => {
        set({ user: { ...get().user, signupInfo: data } });
      },
    }),
    {
      name: "system-edge-user",
    },
  ),
);

export default useUser;
