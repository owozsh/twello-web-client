export type Board = {
  id: string;
  metadata: any;
  title: string;
  columns: Column[];
};

export type Column = {
  id: string;
  title: string;
  cards: Card[];
};

export type Card = {
  id: string;
  title: string;
};
