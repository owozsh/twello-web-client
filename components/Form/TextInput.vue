<template>
  <input
    :placeholder="label"
    :type="type"
    class="transition-all w-full bg-base-50 px-4 py-3 rounded-xl border border-1 border-base-200 hover:border-base-300 text-base-700 placeholder:text-base-300 hover:bg-base-50 outline outline-0 outline-transparent focus:outline-primary/20 focus:outline-4 focus:border-primary/75 focus:text-primary focus:placeholder:text-primary/60"
  />
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  type: "text" | "password";
}>();
</script>
