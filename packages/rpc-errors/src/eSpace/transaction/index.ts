import type { RegisterErrorsType } from "../../types";
import {
  MaxPriorityFeeExceedsMaxFeeError,
  NonceTooHighError,
  TransactionRejectedError,
} from "./transaction";

export { TransactionRejectedError, NonceTooHighError };

export const TransactionErrors: RegisterErrorsType = {
  [TransactionRejectedError.code]: {
    code: TransactionRejectedError.code,
    baseError: TransactionRejectedError,
    detailErrors: [NonceTooHighError, MaxPriorityFeeExceedsMaxFeeError],
  },
};
