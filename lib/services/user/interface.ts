import { ServiceResponse } from "../service-response";
import { CreateUserPayload, LoginPayload, User } from "./types";

export interface IUserService {
  getUser(): Promise<ServiceResponse<User>>;
  login(payload: LoginPayload): Promise<{
    token: string;
  }>;
  create_user(payload: CreateUserPayload): Promise<{
    user: User;
    token: string;
  }>;
}
