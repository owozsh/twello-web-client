<script setup lang="ts">
import { useUserStore } from "~/lib/store/user";
import { Board } from "~/lib/types/board";

const config = useRuntimeConfig();
const { auth_token } = useUserStore();

const { data: boards } = useFetch<{
  boards: {
    owned: Board[];
    shared: Board[];
  };
}>(`user/my-boards`, {
  method: "GET",
  baseURL: config.public.baseURL,
  headers: {
    authorization: auth_token || "",
  },
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<script lang="ts">
export default {
  name: "Home",
};
</script>

<template>
  <div
    class="flex flex-col mx-14 gap-8 items-center justify-center w-full h-full pb-72"
  >
    <div class="flex flex-col gap-1 w-72">
      <NuxtLink to="boards/create">
        <button
          class="flex items-center rounded-md p-3 w-full gap-4 hover:bg-base-200 transition-all"
        >
          <span class="i-mdi-plus text-lg"></span>
          New Board
        </button>
      </NuxtLink>
      <hr />
      <ul>
        <li v-for="board in boards?.boards?.owned" :key="board.id">
          <NuxtLink :to="`boards/${board.id}`">
            <button
              class="flex items-center rounded-md p-3 w-full gap-4 hover:bg-base-200 transition-all"
            >
              <span class="i-mdi-folder text-lg"></span>
              {{ board.title }}
            </button>
          </NuxtLink>
        </li>
      </ul>
      <hr />
      <ul>
        <li v-for="board in boards?.boards?.shared" :key="board.id">
          <NuxtLink :to="`boards/${board.id}`">
            <button
              class="flex items-center rounded-md p-3 w-full gap-4 hover:bg-base-200 transition-all"
            >
              <span class="i-mdi-folder-shared text-lg"></span>
              {{ board.title }}
            </button>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
