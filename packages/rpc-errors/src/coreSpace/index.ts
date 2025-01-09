import { BaseError } from "../../_cjs/src";
import InvalidParamsErrors from "./invalidParamsErrors";

export type {
  InvalidParamsErrorType,
  EmptyEpochStringErrorType,
  EpochNumberTooLargeErrorType,
  InvalidDigitEpochErrorType,
  InvalidEpochTypeErrorType,
  MissingHexPrefixErrorType,
} from "./invalidParamsErrors";

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
