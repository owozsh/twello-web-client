import { ServiceError } from "./_service-error/types";

export type ServiceResponse<T> = {
  data?: T;
  error?: {
    status: number;
    message: string;
  };
};
