import { BaseError } from "../../_cjs/src";
import { ErrorClassType, type RegisterErrorsType } from "../types";
import CallExecutionErrors from "./callExecutionErrors";
import CustomErrors from "./customErrors";
import InternalErrors from "./internalErrors";
import InvalidParamsErrors from "./invalidParamsErrors";

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
];

export default coreSpaceErrors;
