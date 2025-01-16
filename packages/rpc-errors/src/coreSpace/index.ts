import { BaseError } from "../../_cjs/src";
import { ErrorClassType, RegisterErrorsType } from "../types";
import CallExecutionErrors from "./CallExecutionErrors";
import CustomErrors from "./CustomErrors";
import InternalErrors from "./InternalErrors";
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
