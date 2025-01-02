import { BaseError } from "../../_cjs/src";
import InvalidParamsErrors from "./invalidParams";

export type {
  InvalidParamsErrorType,
  EmptyEpochStringErrorType,
  EpochNumberTooLargeErrorType,
  InvalidDigitEpochErrorType,
  InvalidEpochTypeErrorType,
  MissingHexPrefixErrorType,
} from "./invalidParams";

export type CoreSpaceErrorsType = {
  codeMap: { code: number; error: new (...args: any[]) => BaseError }[];
  messageMap: {
    pattern: RegExp;
    error: new (...args: any[]) => BaseError;
  }[];
};

const coreSpaceErrors: CoreSpaceErrorsType = {
  codeMap: [InvalidParamsErrors.codeMap].flat(),
  messageMap: [InvalidParamsErrors.messageMap].flat(),
};

export default coreSpaceErrors;
