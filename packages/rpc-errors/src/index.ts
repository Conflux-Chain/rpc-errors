export { type BaseErrorType, BaseError } from "./baseError.js";

export { RPCError } from "./rpcErrors";

import coreSpaceErrors, {
  type CoreSpaceErrorsType,
} from "./coreSpace/index.js";

import eSpaceErrors, { type ESpaceErrorsType } from "./eSpace/index.js";

export {
  coreSpaceErrors,
  type CoreSpaceErrorsType,
  eSpaceErrors,
  type ESpaceErrorsType,
};
