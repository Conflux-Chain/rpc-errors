import type { RegisterErrorsType } from "../../types";
import { NonceTooHighError, TransactionError } from "./transaction";

export { TransactionError, NonceTooHighError };

export const TransactionErrors: RegisterErrorsType = {
  [TransactionError.code]: {
    code: TransactionError.code,
    baseError: TransactionError,
    detailErrors: [NonceTooHighError],
  },
};
