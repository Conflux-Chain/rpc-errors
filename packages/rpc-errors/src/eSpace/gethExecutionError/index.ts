import type { RegisterErrorsType } from "../../types";
import {
  ContractExecutionRevertedError,
  ExecutionRevertedError,
} from "./contract";

import { EthExecutionError } from "./gethExecutionError";
import { EthInsufficientFundsError } from "./transaction";

export { EthExecutionError };
export { ContractExecutionRevertedError };

export const EthExecutionErrors: RegisterErrorsType = {
  [EthExecutionError.code]: {
    code: EthExecutionError.code,
    baseError: EthExecutionError,
    detailErrors: [
      EthInsufficientFundsError,
      ContractExecutionRevertedError,
      ExecutionRevertedError,
    ],
  },
};
