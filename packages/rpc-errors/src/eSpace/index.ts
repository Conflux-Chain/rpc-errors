import type { RegisterErrorsType } from "../types";
import InvalidParamsErrors from "./invalidParamsErrors";

export {
  InvalidParamsError,
  MissingHexPrefixError,
} from "./invalidParamsErrors";

import InternalErrors from "./internalErrors";
import { TransactionErrors } from "./transaction";

export { InternalError } from "./internalErrors";

export { TransactionError } from "./transaction";

export type ESpaceErrorsType = RegisterErrorsType[];

const eSpaceErrors: ESpaceErrorsType = [
  InvalidParamsErrors,
  InternalErrors,
  TransactionErrors,
];

export default eSpaceErrors;
