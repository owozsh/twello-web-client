import { generateBoard } from "~/tests/mockGenerator";
import { Board } from "../../types/board";

export const getBoard = (id: string): Board => {
  const board = generateBoard();

  return board;
};
