<script setup lang="ts">
import { useBoardStore } from "~/lib/store/board";
import { useUserStore } from "~/lib/store/user";

const route = useRoute();

const { user } = useUserStore();

const store = useBoardStore();

definePageMeta({
  middleware: ["auth"],
  pageTransition: {
    name: "slide",
  },
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
  <div class="flex flex-col justify-between items-start h-screen">
    <nav class="flex flex-row h-20 w-full items-center px-4">
      <div
        class="h-10 flex items-center justify-center bg-black rounded-full mr-6 text-base-50 p-3 gap-3"
      >
        <span class="i-mdi-face-profile text-2xl"></span>
        <p class="mr-3">
          {{ user?.name || "User" }}
        </p>
      </div>
      <NuxtLink to="/" class="text-xl mr-4 hover:underline underline-offset-4">
        Home
      </NuxtLink>
      <transition name="slide">
        <span
          v-if="route.name?.toString().includes('boards-board')"
          class="i-mdi-arrow-right mr-4"
        ></span>
      </transition>
      <transition name="slide">
        <input
          v-if="
            route.name?.toString().includes('boards-board') &&
            store.board?.id !== null
          "
          class="bg-transparent font-2xl"
          :value="store.board.title"
          @input="(e) => store.update_board_title(e.target.value)"
        />
      </transition>
      <div class="flex flex-1 items-center justify-end gap-2">
        <transition name="slide">
          <div
            v-if="
              route.name?.toString().includes('boards-board') &&
              store.board?.id !== null
            "
          >
            <label for="bg-color"> Background Color: </label>
            <input
              id="bg-color"
              class="bg-transparent font-2xl w-24"
              :value="store.board.metadata.background_color"
              @focusout="store.update_board_bg_color($event.target.value)"
            />
          </div>
        </transition>
        <transition name="slide">
          <div
            v-if="
              route.name?.toString().includes('boards-board') &&
              store.board?.id !== null
            "
          >
            <label for="text-color"> Text Color: </label>
            <input
              id="text-color"
              class="bg-transparent font-2xl w-24"
              :value="store.board.metadata.text_color"
              @focusout="store.update_board_txt_color($event.target.value)"
            />
          </div>
        </transition>
        <transition name="slide">
          <NuxtLink :to="`${route.fullPath}/share`">
            <button
              v-if="route.name === 'boards-board'"
              class="h-10 flex items-center justify-center bg-primary btn-hover rounded-full text-base-50 p-3 gap-3"
            >
              <span class="i-mdi-share text-2xl"></span>
              Share
            </button>
          </NuxtLink>
        </transition>
      </div>
    </nav>
    <div class="flex-1 px-4 w-full">
      <slot />
    </div>
    <div
      class="flex flex-row h-8 w-full bg-black justify-between px-4 items-center"
    >
      <div class="flex items-center justify-center">
        <span class="text-emerald-400 i-mdi-circle mr-2 text-sm"></span>
        <p class="text-base-50">Connected</p>
      </div>
      <button
        class="flex items-center text-base-50 justify-self-end hover:underline decoration-base-50"
        @click="logout"
      >
        <span class="i-mdi-logout mr-2"></span>
        logout
      </button>
    </div>
  </div>
</template>
