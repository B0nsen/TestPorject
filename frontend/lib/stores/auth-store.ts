import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  email: string;
  roleId: number | null;

  setEmail: (email: string) => void;
  setRoleId: (roleId: number) => void;
  clearAuth: () => void;
  isAdmin: () => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      email: "",
      roleId: null,

      setEmail: (email) => set({ email }),

      setRoleId: (roleId) => set({ roleId }),

      clearAuth: () =>
        set({
          email: "",
          roleId: null,
        }),

      isAdmin: () => {
        const roleId = get().roleId;
        return roleId === 2 || roleId === 3;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);