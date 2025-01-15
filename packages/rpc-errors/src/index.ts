export { type BaseErrorType, BaseError } from "./baseError.js";

export { RPCError } from "./rpcErrors";

import coreSpaceErrors, {
  type CoreSpaceErrorsType,
} from "./coreSpace/index.js";

export { coreSpaceErrors, type CoreSpaceErrorsType };
