<script setup lang="ts">
import { useUserStore } from "../lib/store/user";

definePageMeta({
  layout: "auth",
});
</script>

<script lang="ts">
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const { login, $state } = useUserStore();

      await login({
        email: this.email,
        password: this.password,
      });

      if ($state.auth_token) await navigateTo("/");
      if ($state.error) {
        alert(JSON.stringify($state.error.message));
      }
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col items-center px-4 sm:px-10 py-14 gap-20 h-full w-full sm:h-fit sm:w-[30rem] justify-around"
  >
    <form
      @submit.prevent="login"
      class="flex flex-col gap-6 w-full items-center"
    >
      <input
        placeholder="E-Mail"
        type="text"
        class="form-input"
        v-model="email"
      />
      <input
        placeholder="Password"
        type="password"
        class="form-input"
        v-model="password"
      />
      <button
        type="submit"
        class="flex items-center justify-center rounded-xl bg-primary px-3 py-4 w-full text-white leading-none gap-2 group"
      >
        Login
        <span
          class="transition-transform group-hover:translate-x-2 i-mdi-arrow-right"
        ></span>
      </button>
    </form>
    <div class="flex items-center justify-between w-full px-3">
      <NuxtLink
        to="/create-account"
        class="text-sm text-primary hover:underline"
      >
        Create account
      </NuxtLink>
      <NuxtLink
        to="/reset-password"
        class="text-sm text-base-400 hover:underline"
      >
        Reset your password
      </NuxtLink>
    </div>
  </div>
</template>
