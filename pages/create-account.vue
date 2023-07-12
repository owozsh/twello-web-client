<script setup lang="ts">
import { useUserStore } from "../lib/store/user";

definePageMeta({
  layout: "auth",
});
</script>

<script lang="ts">
export default {
  name: "CreateAccount",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    async createAccount() {
      const { create_user, $state } = useUserStore();

      if (this.password !== this.password_confirmation) {
        alert("Passwords do not match");
        return;
      }

      await create_user({
        email: this.email,
        name: this.name,
        password: this.password,
      });

      if ($state.auth_token) await navigateTo("/");
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col items-center px-4 sm:px-10 py-14 gap-20 h-full w-full sm:h-fit sm:w-[30rem] justify-around"
  >
    <form
      class="flex flex-col gap-6 w-full items-center"
      @submit.prevent="createAccount"
    >
      <input
        placeholder="Name"
        type="text"
        class="form-input"
        v-model.trim="name"
      />
      <input
        placeholder="E-Mail"
        type="email"
        class="form-input"
        v-model.trim="email"
      />
      <input
        placeholder="Password"
        type="password"
        class="form-input"
        v-model.trim="password"
      />
      <input
        placeholder="Confirm your password"
        type="password"
        class="form-input"
        v-model.trim="password_confirmation"
      />
      <button
        type="submit"
        class="flex items-center justify-center rounded-xl bg-primary px-3 py-4 w-full text-white leading-none gap-2 group"
      >
        Create Account
        <span
          class="transition-transform group-hover:translate-x-2 i-mdi-arrow-right"
        ></span>
      </button>
    </form>
    <div class="flex items-center justify-between w-full px-3">
      <NuxtLink to="/login" class="text-sm text-primary hover:underline">
        Login
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
