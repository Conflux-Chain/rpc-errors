import { RegisterErrorsType } from "../../types";
import { CallExecutionError } from "./callExecution";
import {
  NotExecutedDropInvalidRecipientAddress,
  NotExecutedDropNotEnoughGasLimitError,
  NotExecutedDropOldNonceError,
} from "./executionOutcome";

const CallExecutionErrors: RegisterErrorsType = {
  [CallExecutionError.code]: {
    code: CallExecutionError.code,
    baseError: CallExecutionError,
    detailErrors: [
      NotExecutedDropOldNonceError,
      NotExecutedDropInvalidRecipientAddress,
      NotExecutedDropNotEnoughGasLimitError,
    ],
  },
};

export default CallExecutionErrors;
