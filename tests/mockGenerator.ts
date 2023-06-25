import { faker } from "@faker-js/faker";

import { Board, Card, Column } from "~/lib/types/board";

const NUMBER_OF_CARDS = 5;
const NUMBER_OF_COLUMNS = 5;

export const generateCard = (): Card => ({
  id: faker.string.uuid(),
  title: faker.string.sample(),
});

export const generateColumn = (): Column => ({
  id: faker.string.uuid(),
  title: faker.string.sample(),
  cards: Array(NUMBER_OF_CARDS)
    .fill(0)
    .map((_) => generateCard()),
});

export const generateBoard = (): Board => ({
  id: faker.string.uuid(),
  title: faker.string.sample(),
  columns: Array(NUMBER_OF_COLUMNS)
    .fill(0)
    .map(() => generateColumn()),
  metadata: {},
});
