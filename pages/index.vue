<script setup lang="ts">
import { useUserStore } from "~/lib/store/user";

definePageMeta({
  middleware: ["auth"],
});
</script>

<script lang="ts">
export default {
  methods: {
    async logout() {
      const { logout } = useUserStore();

      await logout();

      await navigateTo("/login");
    },
  },
};
</script>

<template>
  <div class="flex flex-col h-full justify-between w-full">
    <Board />
    <div
      class="flex flex-row h-8 w-full bg-base-200 justify-between px-4 items-center"
    >
      <p class="text-base-600">Connected</p>
      <button
        class="text-base-600 justify-self-end hover:underline decoration-base-600"
        @click="logout"
      >
        logout
      </button>
    </div>
  </div>
</template>
