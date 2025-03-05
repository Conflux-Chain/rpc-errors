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
import {
  ExceededMaxGasError,
  FailedToDecodeSignedTransactionError,
  InsufficientFundsError,
  InsufficientGasError,
  UnrecognizedTransactionTypeError,
} from "./transaction";

export { InvalidParamsError } from "./invalidParams";
export {
  MissingHexPrefixError,
  InvalidDigitBlockError as InvalidDigitError,
  InvalidBlockTypeError,
  SpecifiedBlockNotExecutedError,
  EmptyBlockStringError,
  LatestMinedNotExecutedError,
} from "./block";
export {
  FailedToDecodeSignedTransactionError,
  InsufficientGasError,
  InsufficientFundsError,
  ExceededMaxGasError,
  UnrecognizedTransactionTypeError,
} from "./transaction";

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
      InsufficientGasError,
      InsufficientFundsError,
      ExceededMaxGasError,
      UnrecognizedTransactionTypeError,
    ],
  },
};

export default InvalidParamsErrors;
