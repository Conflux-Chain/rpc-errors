import type { RegisterErrorsType } from "../../types";
import {
  MissingHexPrefixError,
  InvalidDigitBlockError,
  InvalidBlockTypeError,
  SpecifiedBlockNotExecutedError,
  EmptyBlockStringError,
  LatestMinedNotExecutedError,
} from "./block";
import { InvalidParamsError } from "./invalidParams";
import { FailedToDecodeSignedTransactionError } from "./transaction";

export { InvalidParamsError } from "./invalidParams";
export {
  MissingHexPrefixError,
  InvalidDigitBlockError as InvalidDigitError,
  InvalidBlockTypeError,
  SpecifiedBlockNotExecutedError,
  EmptyBlockStringError,
  LatestMinedNotExecutedError,
} from "./block";
export { FailedToDecodeSignedTransactionError } from "./transaction";

const InvalidParamsErrors: RegisterErrorsType = {
  [InvalidParamsError.code]: {
    code: InvalidParamsError.code,
    baseError: InvalidParamsError,
    detailErrors: [
      MissingHexPrefixError,
      InvalidDigitBlockError,
      InvalidBlockTypeError,
      SpecifiedBlockNotExecutedError,
      EmptyBlockStringError,
      LatestMinedNotExecutedError,
      FailedToDecodeSignedTransactionError,
    ],
  },
};

export default InvalidParamsErrors;
