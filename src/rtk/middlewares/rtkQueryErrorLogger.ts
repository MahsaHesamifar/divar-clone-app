import { toast } from "react-toastify";
import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";

import { messages } from "@/constants";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next: any) => (action: any) => {
    if (isRejectedWithValue(action)) {
      const { status } = action.payload;

      switch (status) {
        case 401:
          toast.error(messages.errors.error401);
          break;
        case 404:
          toast.error(messages.errors.error404);
          break;
        default:
          toast.error(messages.errors.default);
          break;
      }
    }

    return next(action);
  };
