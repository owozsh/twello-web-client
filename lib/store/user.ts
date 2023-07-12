import { defineStore } from "pinia";
import { UserService } from "../services/user";
import { CreateUserPayload, LoginPayload, User } from "../services/user/types";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
    auth_token: null as string | null,
    error:null as any
  }),

  actions: {
    async create_user(payload: CreateUserPayload) {
      const userService = new UserService();

      const res = await userService.create_user(payload);

      if (!res.token || !res.user) {
        return;
      }

      this.auth_token = res.token;
      this.user = res.user;
    },

    async login(payload: LoginPayload) {
      const userService = new UserService();

      const res = await userService.login(payload);
      
      if (!res.token) {
        this.error = res
        return;
      }

      this.auth_token = res.token;
      this.user = res.user;
      this.error = null
    },

    async logout() {
      this.user = null;
      this.auth_token = null;
      this.error = null
    },
  },
  persist: true,
});
