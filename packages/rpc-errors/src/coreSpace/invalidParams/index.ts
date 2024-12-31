import {
  EmptyEpochStringErrorType,
  EpochNumberTooLargeErrorType,
  InvalidDigitEpochErrorType,
  InvalidEpochTypeErrorType,
  MissingHexPrefixErrorType,
} from "./epoch";
import { InvalidParamsErrorType } from "./invalidParams";

export type fromErrorMessageReturnType =
  | InvalidParamsErrorType
  | InvalidEpochTypeErrorType
  | EpochNumberTooLargeErrorType
  | EmptyEpochStringErrorType
  | InvalidDigitEpochErrorType
  | MissingHexPrefixErrorType;

export function fromErrorMessage(
  errorMessage: string
): fromErrorMessageReturnType {}
