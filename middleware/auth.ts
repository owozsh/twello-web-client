import { useUserStore } from "~/lib/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const { auth_token } = useUserStore();

  if (!auth_token) {
    return navigateTo("/login");
  }
});
