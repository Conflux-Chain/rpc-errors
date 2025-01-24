import type { RegisterErrorsType } from "../../types";
import { FilterNotFoundError, InvalidRequestError } from "./invalidRequest";

export const InvalidRequestErrors: RegisterErrorsType = {
  [InvalidRequestError.code]: {
    code: InvalidRequestError.code,
    baseError: InvalidRequestError,
    detailErrors: [FilterNotFoundError],
  },
};
