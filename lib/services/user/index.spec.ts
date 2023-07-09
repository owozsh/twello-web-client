import { describe, test, expect, it } from "vitest";
import { UserService } from ".";
import { ServiceError } from "../_service-error/types";

describe("User Service", () => {
  const userService = new UserService();

  describe("create_user", async () => {
    it("should return an error message when creating an user with an empty email", async () => {
      const created_user = await userService.create_user({
        email: "",
        name: "teste",
        password: "test",
      });

      expect(created_user?.error?.message).toBeDefined();
    });

    it("should create a user", async () => {
      const created_user = await userService.create_user({
        email: "teste@email.com",
        name: "teste",
        password: "12345678",
      });

      expect(created_user?.data).toBeDefined();
    });
  });
});
