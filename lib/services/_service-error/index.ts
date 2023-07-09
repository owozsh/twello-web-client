import { AxiosError } from "axios";
import { ServiceResponse } from "../service-response";

export const handle_service_error = (
  e: AxiosError<{ message: string }>
): ServiceResponse<null> => {
  const error_message = e.response?.data?.message;

  return {
    data: null,
    error: {
      status: e.status || 500,
      message: error_message ?? e.message,
    },
  };
};
