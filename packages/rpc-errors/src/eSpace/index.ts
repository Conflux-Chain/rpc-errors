import type { RegisterErrorsType } from "../types";
import InvalidParamsErrors from "./invalidParamsErrors";

export {
  InvalidParamsError,
  MissingHexPrefixError,
} from "./invalidParamsErrors";

export type ESpaceErrorsType = RegisterErrorsType[];

const eSpaceErrors: ESpaceErrorsType = [InvalidParamsErrors];

export default eSpaceErrors;
