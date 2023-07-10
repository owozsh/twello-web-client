import { defineStore } from "pinia";
import { Board, Column } from "../types/board";
import { useUserStore } from "./user";

const base_endpoint = "board";

type BoardRes = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  backgroundColor: string;
  textColor: string;
  content: Column[];
};

export const useBoardStore = defineStore("board", {
  state: () => ({
    board: {
      id: "",
      metadata: {},
      title: "",
      columns: [],
    } as Board,
  }),

  actions: {
    async get_board() {
      const config = useRuntimeConfig();
      const route = useRoute();
      const { auth_token } = useUserStore();

      const res = await $fetch<BoardRes>(
        `${base_endpoint}/${route.params.board}`,
        {
          method: "GET",
          baseURL: config.public.baseURL,
          headers: {
            authorization: auth_token || "",
          },
        }
      );

      this.board = {
        title: res.title,
        columns: res.content,
        id: res.id,
        metadata: {
          backgroundColor: res.backgroundColor,
          textColor: res.textColor,
        },
      };
    },
    async update_board(board: Board) {
      const config = useRuntimeConfig();
      const route = useRoute();
      const { auth_token } = useUserStore();

      this.board = board;

      await $fetch(`${base_endpoint}/${route.params.board}`, {
        method: "POST",
        body: JSON.stringify(board),
        baseURL: config.public.baseURL,
        headers: {
          authorization: auth_token || "",
        },
      });
    },
  },
});
