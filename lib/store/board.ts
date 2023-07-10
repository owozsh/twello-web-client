import { defineStore } from "pinia";
import { Board } from "../types/board";

const base_endpoint = "board";

export const useBoardStore = defineStore("board", {
  state: () => ({
    board: null as Board | null,
  }),

  actions: {
    async get_board() {
      const config = useRuntimeConfig();

      const res = await $fetch(`${base_endpoint}/sign-up`, {
        method: "POST",
        body: "a",
        baseURL: config.public.baseURL,
      });
    },
  },
});
