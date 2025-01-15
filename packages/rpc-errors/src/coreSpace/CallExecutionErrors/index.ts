import { RegisterErrorsType } from "../../types";
import { CallExecutionError } from "./callExecution";
import {
  NotExecutedDropInvalidRecipientAddress,
  NotExecutedDropNotEnoughGasLimitError,
  NotExecutedDropOldNonceError,
} from "./executionOutcome";

const CallExecutionErrors: RegisterErrorsType = {
  codeMap: [{ code: CallExecutionError.code, error: CallExecutionError }],
  messageMap: [
    {
      pattern: NotExecutedDropOldNonceError.pattern,
      error: NotExecutedDropOldNonceError,
    },
    {
      pattern: NotExecutedDropInvalidRecipientAddress.pattern,
      error: NotExecutedDropInvalidRecipientAddress,
    },
    {
      pattern: NotExecutedDropNotEnoughGasLimitError.pattern,
      error: NotExecutedDropNotEnoughGasLimitError,
    },
  ],
};

export default CallExecutionErrors;
