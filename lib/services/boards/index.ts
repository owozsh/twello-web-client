import { generateBoard } from "~/tests/mockGenerator";
import { Board } from "../../types/board";
import { CreateBoardPayload } from "./types";
import { useUserStore } from "~/lib/store/user";

export const getBoard = (id: string): Board => {
  const board = generateBoard();

  return board;
};

export class BoardService {
  base_endpoint = "board";

  constructor() {}

  async create_board(payload: CreateBoardPayload): Promise<Board> {
    const config = useRuntimeConfig();
    const { auth_token, logout } = useUserStore();

    if (!auth_token) logout();

    return $fetch(`${this.base_endpoint}/create`, {
      method: "POST",
      body: {
        ...payload,
        backgroundColor: "#fff",
        textColor: "#000",
      },
      baseURL: config.public.baseURL,
      headers: {
        authorization: auth_token || "",
      },
    });
  }

  async get_boards(): Promise<Board[]> {
    const config = useRuntimeConfig();
    const { auth_token, logout } = useUserStore();

    if (!auth_token) logout();

    return $fetch(`users/my-boards`, {
      method: "GET",
      baseURL: config.public.baseURL,
      headers: {
        authorization: auth_token || "",
      },
    });
  }
}
