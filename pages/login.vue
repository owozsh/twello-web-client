<template>
  <form class="flex flex-col gap-6 w-full items-center">
    <TextInput label="E-Mail" type="text" />
    <TextInput label="Password" type="password" />
    <button
      class="flex items-center justify-center rounded-xl bg-primary px-3 py-4 w-full text-white leading-none gap-2 group"
    >
      Login
      <span
        class="transition-transform group-hover:translate-x-2 i-mdi-arrow-right"
      ></span>
    </button>
  </form>
  <div class="flex items-center justify-between w-full px-3">
    <NuxtLink to="/create-account" class="text-sm text-primary hover:underline">
      Create account
    </NuxtLink>
    <NuxtLink
      to="/reset-password"
      class="text-sm text-base-400 hover:underline"
    >
      Reset your password
    </NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});
</script>
