import type { RegisterErrorsType } from "../types";
import InvalidParamsErrors from "./invalidParamsErrors";

import InternalErrors from "./internalErrors";
import { TransactionErrors } from "./transaction";
import { ExecutionErrors } from "./executionError";
import { InvalidInputErrors } from "./invalidInput";
import { EthExecutionErrors } from "./gethExecutionError";

export { InternalError } from "./internalErrors";

export { TransactionRejectedError } from "./transaction";

export type ESpaceErrorsType = RegisterErrorsType[];

const eSpaceErrors: ESpaceErrorsType = [
  InvalidParamsErrors,
  InternalErrors,
  TransactionErrors,
  ExecutionErrors,
  InvalidInputErrors,
  EthExecutionErrors,
];

export {
  BlockHashesNotFoundError,
  InvalidEpochIdError,
} from "./executionError";

export {
  EthExecutionError,
  ContractExecutionRevertedError,
} from "./gethExecutionError";

export {
  IncorrectTransactionSpaceError,
  InvalidTransactionSignatureError,
  ExceedsBlockGasLimitError,
  TransactionUnderpricedError,
} from "./internalErrors";
export { InsufficientGasLimitError, NonceOutdatedError } from "./invalidInput";

export {
  MissingHexPrefixError,
  InvalidDigitBlockError,
  InvalidBlockTypeError,
  SpecifiedBlockNotExecutedError,
  EmptyBlockStringError,
  LatestMinedNotExecutedError,
  FailedToDecodeSignedTransactionError,
  InsufficientGasError,
  InsufficientFundsError,
  ExceededMaxGasError,
  UnrecognizedTransactionTypeError,
} from "./invalidParamsErrors";

export { NonceTooHighError } from "./transaction";

export default eSpaceErrors;
