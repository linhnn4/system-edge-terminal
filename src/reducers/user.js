import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  isLoggedIn: true,
  username: null,
  signupInfo: null,
};

const useUser = create(
  persist(
    (set, get) => ({
      user: initialState,
      login: async () => {
        try {
          set({
            user: {},
          });
        } catch (error) {
          console.log({ error });
        }
      },
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
