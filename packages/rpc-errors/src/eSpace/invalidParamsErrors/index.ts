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

export { InvalidParamsError } from "./invalidParams";
export {
  MissingHexPrefixError,
  InvalidDigitBlockError as InvalidDigitError,
  InvalidBlockTypeError,
  SpecifiedBlockNotExecutedError,
  EmptyBlockStringError,
  LatestMinedNotExecutedError,
} from "./block";

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
    ],
  },
};

export default InvalidParamsErrors;
