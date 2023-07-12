export type Board = {
  id: string;
  metadata: {
    background_color: string;
    text_color: string;
  };
  title: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt?: string;
  relationId: string;
  columns: Column[];
};

export type Column = {
  id: string;
  title: string;
  cards: Card[];
  createdAt?: string;
  updatedAt: string;
};

export type Card = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
};
