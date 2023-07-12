<script setup lang="ts">
import { useUserStore } from "~/lib/store/user";

definePageMeta({
  layout: "auth",
});
</script>

<script lang="ts">
export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async resetPassword() {
      const { request_rest_password } = useUserStore();

      await request_rest_password(this.email).catch((e) => {
        alert(JSON.stringify(e.message));
      });

      await navigateTo("reset-password/code");
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col items-center px-4 sm:px-10 py-14 gap-20 h-full w-full sm:h-fit sm:w-[30rem] justify-around"
  >
    <form
      @submit.prevent="resetPassword"
      class="flex flex-col gap-6 w-full items-center"
    >
      <input
        placeholder="E-Mail"
        type="text"
        class="form-input"
        v-model="email"
      />
      <button
        type="submit"
        class="flex items-center justify-center rounded-xl bg-primary px-3 py-4 w-full text-white leading-none gap-2 group"
      >
        Send Verification Code
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
      <NuxtLink to="/login" class="text-sm text-primary hover:underline">
        Login
      </NuxtLink>
    </div>
  </div>
</template>
