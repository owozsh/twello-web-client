import { ServiceResponse } from "../service-response";
import { IUserService } from "./interface";
import { CreateUserPayload, LoginPayload, User } from "./types";

export class UserService implements IUserService {
  base_endpoint = "user";

  constructor() {}

  async getUser(): Promise<ServiceResponse<User>> {
    return $fetch(this.base_endpoint);
  }

  async login(payload: LoginPayload): Promise<{
    token: string;
  }> {
    const config = useRuntimeConfig();

    return $fetch(`${this.base_endpoint}/sign-in`, {
      method: "POST",
      body: payload,
      baseURL: config.public.baseURL,
    });
  }

  async create_user(payload: CreateUserPayload): Promise<{
    user: User;
    token: string;
  }> {
    const config = useRuntimeConfig();

    return $fetch(`${this.base_endpoint}/sign-up`, {
      method: "POST",
      body: payload,
      baseURL: config.public.baseURL,
    });
  }
}
