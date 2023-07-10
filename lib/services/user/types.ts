export type User = {
  id: string;
  name: string;
  password: string;
  email: string;
  createdAt: number;
};

export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type Maintainer = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  boardId: string;
  isOwner: boolean;
  canEdit: boolean;
  isFavorite: boolean;
  email: string;
};
