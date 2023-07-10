<script setup lang="ts">
import { BoardService } from "~/lib/services/boards";

definePageMeta({
  middleware: ["auth"],
});
</script>

<script lang="ts">
export default {
  name: "CreateBoard",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    async create_board() {
      const boardService = new BoardService();

      const board = await boardService.create_board({
        title: this.title,
      });

      if (board) await navigateTo(`/boards/${board.id}`);
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col mx-14 gap-8 items-center justify-center w-full h-full pb-72"
  >
    <form class="flex flex-col w-72 gap-2" @submit.prevent="create_board">
      <h3 class="text-xl ml-2">New Board</h3>
      <input class="input" placeholder="Board Title" v-model="title" />
      <div class="flex gap-2">
        <NuxtLink to="/">
          <button
            class="flex items-center justify-center gap-2 p-3 bg-base-200 hover:brightness-95 active:brightness-90 w-full rounded-md transition-all"
          >
            <span class="i-mdi-arrow-left" />
          </button>
        </NuxtLink>
        <button
          type="submit"
          class="flex leading-4 items-center justify-center gap-2 p-3 bg-primary hover:brightness-110 active:brightness-95 w-full rounded-md text-base-50 transition-all"
        >
          Create Board
          <span class="i-mdi-arrow-right" />
        </button>
      </div>
    </form>
  </div>
</template>
