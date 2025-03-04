import type { RegisterErrorsType } from "../../types";
import { InternalError } from "./Internal";
import {
  ExceedsBlockGasLimitError,
  IncorrectTransactionSpaceError,
  InvalidTransactionSignatureError,
  TransactionUnderpricedError,
} from "./transaction";

export {
  IncorrectTransactionSpaceError,
  InvalidTransactionSignatureError,
  ExceedsBlockGasLimitError,
  TransactionUnderpricedError,
} from "./transaction";
export { InternalError } from "./Internal";

const InternalErrors: RegisterErrorsType = {
  [InternalError.code]: {
    code: InternalError.code,
    baseError: InternalError,
    detailErrors: [
      IncorrectTransactionSpaceError,
      InvalidTransactionSignatureError,
      ExceedsBlockGasLimitError,
      TransactionUnderpricedError,
    ],
  },
};

export default InternalErrors;
