export { type BaseErrorType, BaseError } from "./baseError.js";

export { type RegisterErrorsType, RPCError } from "./rpcErrors";

import coreSpaceErrors, {
  type CoreSpaceErrorsType,
} from "./coreSpace/index.js";

export { coreSpaceErrors, type CoreSpaceErrorsType };
