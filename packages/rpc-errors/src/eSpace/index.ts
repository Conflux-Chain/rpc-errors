import type { RegisterErrorsType } from "../types";
import InvalidParamsErrors from "./invalidParamsErrors";

export {
  InvalidParamsError,
  MissingHexPrefixError,
} from "./invalidParamsErrors";

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

export default eSpaceErrors;
