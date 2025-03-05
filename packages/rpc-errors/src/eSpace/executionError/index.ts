import type { RegisterErrorsType } from "../../types";
import { BlockHashesNotFoundError, InvalidEpochIdError } from "./block";
import { ExecutionError } from "./executionError";

export { BlockHashesNotFoundError, InvalidEpochIdError };

export const ExecutionErrors: RegisterErrorsType = {
  [ExecutionError.code]: {
    code: ExecutionError.code,
    baseError: ExecutionError,
    detailErrors: [BlockHashesNotFoundError, InvalidEpochIdError],
  },
};
