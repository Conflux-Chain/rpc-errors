import type { RegisterErrorsType } from "../types";
import CallExecutionErrors from "./callExecutionErrors";
import CustomErrors from "./customErrors";
import InternalErrors from "./internalErrors";
import InvalidParamsErrors from "./invalidParamsErrors";
import { InvalidRequestErrors } from "./JSONRPC";

export type {
  InvalidParamsErrorType,
  EmptyEpochStringErrorType,
  EpochNumberTooLargeErrorType,
  InvalidDigitEpochErrorType,
  InvalidEpochTypeErrorType,
  MissingHexPrefixErrorType,
} from "./invalidParamsErrors";

export type CoreSpaceErrorsType = RegisterErrorsType[];

const coreSpaceErrors: CoreSpaceErrorsType = [
  InvalidParamsErrors,
  InternalErrors,
  CustomErrors,
  CallExecutionErrors,
  InvalidRequestErrors,
];

export default coreSpaceErrors;
