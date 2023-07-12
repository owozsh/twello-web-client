import { defineStore } from "pinia";
import { Board, Column } from "../types/board";
import { useUserStore } from "./user";
import { v4 } from "uuid";

const base_endpoint = "board";

export type BoardRes = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  backgroundColor: string;
  textColor: string;
  isFavorite: boolean;
  relationId: string;
  content: {
    columns: Column[];
  };
};

export const useBoardStore = defineStore("board", {
  state: () => ({
    board: {
      id: "",
      metadata: {},
      title: "",
      columns: [],
      createdAt: "",
      updatedAt: "",
      isFavorite: false,
      relationId: "",
    } as Board,
  }),
  actions: {
    async get_board() {
      const config = useRuntimeConfig();
      const route = useRoute();
      const { auth_token } = useUserStore();

      // if (!route.params.board) return;

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
        columns: res.content.columns,
        id: res.id,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
        isFavorite: res.isFavorite,
        relationId: res.relationId,
        metadata: {
          backgroundColor: res.backgroundColor,
          textColor: res.textColor,
        },
      };

      return this.board;
    },
    async update_board(board: Board) {
      const config = useRuntimeConfig();
      const route = useRoute();
      const { auth_token } = useUserStore();

      this.board = board;

      await $fetch(`${base_endpoint}/${route.params.board}/update`, {
        method: "PUT",
        body: JSON.stringify({
          title: board.title,
          backgroundColor: board.metadata.backgroundColor,
          content: {
            columns: board.columns,
          },
          createdAt: board.metadata.createdAt,
          updatedAt: new Date().toISOString(),
        } as BoardRes),
        baseURL: config.public.baseURL,
        headers: {
          authorization: auth_token || "",
        },
      });
    },
    async add_column() {
      await this.update_board({
        ...this.board,
        columns: [
          ...this.board.columns,
          {
            id: v4(),
            title: "",
            cards: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      });
    },
    async update_column_title(column_id: string, title: string) {
      await this.update_board({
        ...this.board,
        columns: this.board.columns.map((column) => {
          if (column.id === column_id) {
            return {
              ...column,
              title,
              updatedAt: new Date().toISOString(),
            };
          }

          return column;
        }),
      });
    },
    async delete_column(column_id: string) {
      await this.update_board({
        ...this.board,
        columns: this.board.columns.filter((column) => column.id !== column_id),
      });
    },
    async add_card(column_id: string) {
      await this.update_board({
        ...this.board,
        columns: this.board.columns.map((column) => {
          if (column.id === column_id) {
            return {
              ...column,
              updatedAt: new Date().toISOString(),
              cards: [
                ...column.cards,
                {
                  id: v4(),
                  title: "",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
              ],
            };
          }

          return column;
        }),
      });
    },
    async delete_card(column_id: string, card_id: string) {
      await this.update_board({
        ...this.board,
        columns: this.board.columns.map((column) => {
          if (column.id === column_id) {
            return {
              ...column,
              updatedAt: new Date().toISOString(),
              cards: column.cards.filter((card) => card.id !== card_id),
            };
          }

          return column;
        }),
      });
    },
    async update_card_title(column_id: string, card_id: string, title: string) {
      await this.update_board({
        ...this.board,
        columns: this.board.columns.map((column) => {
          if (column.id === column_id) {
            return {
              ...column,
              updatedAt: new Date().toISOString(),
              cards: column.cards.map((card) => {
                if (card.id === card_id) {
                  return {
                    ...card,
                    title,
                    updatedAt: new Date().toISOString(),
                  };
                }

                return card;
              }),
            };
          }

          return column;
        }),
      });
    },
  },
});
