import type { RegisterErrorsType } from "../../types";
import {
  EmptyEpochStringError,
  EpochNumberTooLargeError,
  InvalidDigitEpochError,
  InvalidEpochTypeError,
  MissingHexPrefixError,
} from "./epoch";
import { NonExistentBlockHeaderError } from "./fee";
import { InvalidHashTypeError } from "./hash";
import { InvalidParamsError } from "./invalidParams";

export type { InvalidParamsErrorType } from "./invalidParams";

export type {
  EmptyEpochStringErrorType,
  EpochNumberTooLargeErrorType,
  InvalidDigitEpochErrorType,
  InvalidEpochTypeErrorType,
  MissingHexPrefixErrorType,
} from "./epoch";

const InvalidParamsErrors: RegisterErrorsType = {
  codeMap: [{ code: InvalidParamsError.code, error: InvalidParamsError }],
  messageMap: [
    { pattern: InvalidEpochTypeError.pattern, error: InvalidEpochTypeError },
    {
      pattern: EmptyEpochStringError.pattern,
      error: EmptyEpochStringError,
    },
    {
      pattern: InvalidDigitEpochError.pattern,
      error: InvalidDigitEpochError,
    },
    {
      pattern: EpochNumberTooLargeError.pattern,
      error: EpochNumberTooLargeError,
    },
    {
      pattern: MissingHexPrefixError.pattern,
      error: MissingHexPrefixError,
    },
    {
      pattern: InvalidHashTypeError.pattern,
      error: InvalidHashTypeError,
    },
    {
      pattern: NonExistentBlockHeaderError.pattern,
      error: NonExistentBlockHeaderError,
    },
  ],
};

export default InvalidParamsErrors;
