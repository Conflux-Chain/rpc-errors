import type { RegisterErrorsType } from "../../types";
import { InvalidInputError } from "./invalidInput";
import { InsufficientGasLimitError, NonceOutdatedError } from "./transaction";

export { InvalidInputError } from "./invalidInput";
export { InsufficientGasLimitError, NonceOutdatedError };

export const InvalidInputErrors: RegisterErrorsType = {
  [InvalidInputError.code]: {
    code: InvalidInputError.code,
    baseError: InvalidInputError,
    detailErrors: [NonceOutdatedError, InsufficientGasLimitError],
  },
};
