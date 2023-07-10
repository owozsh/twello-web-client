<script setup>
useHead({
  title: "twello",
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
