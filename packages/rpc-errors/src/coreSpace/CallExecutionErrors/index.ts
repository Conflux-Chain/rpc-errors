import { RegisterErrorsType } from "../../types";
import { CallExecutionError } from "./callExecution";
import {
  ExecutionErrorBumpNonceNotEnoughCashError,
  ExecutionErrorBumpNonceVmBadInstructionError,
  ExecutionErrorBumpNonceVmBadJumpDestinationError,
  ExecutionErrorBumpNonceVmOutOfGasError,
  ExecutionErrorBumpNonceVmOutOfStackError,
  ExecutionErrorBumpNonceVmRevertedError,
  ExecutionErrorBumpNonceVmStackUnderflowError,
  ExecutionErrorBumpNonceVmSubStackUnderflowError,
  NotExecutedDropInvalidRecipientAddress,
  NotExecutedDropNotEnoughGasLimitError,
  NotExecutedDropOldNonceError,
  NotExecutedToReconsiderPackingEpochHeightOutOfBoundError,
  NotExecutedToReconsiderPackingInvalidNonceError,
  NotExecutedToReconsiderPackingNotEnoughBaseFeeError,
  NotExecutedToReconsiderPackingNotEnoughCashFromSponsorError,
  NotExecutedToReconsiderPackingSenderDoesNotExistError,
} from "./executionOutcome";

const CallExecutionErrors: RegisterErrorsType = {
  [CallExecutionError.code]: {
    code: CallExecutionError.code,
    baseError: CallExecutionError,
    detailErrors: [
      NotExecutedDropOldNonceError,
      NotExecutedDropInvalidRecipientAddress,
      NotExecutedDropNotEnoughGasLimitError,
      NotExecutedToReconsiderPackingInvalidNonceError,
      NotExecutedToReconsiderPackingEpochHeightOutOfBoundError,
      NotExecutedToReconsiderPackingNotEnoughCashFromSponsorError,
      NotExecutedToReconsiderPackingSenderDoesNotExistError,
      NotExecutedToReconsiderPackingNotEnoughBaseFeeError,
      ExecutionErrorBumpNonceVmRevertedError,
      ExecutionErrorBumpNonceNotEnoughCashError,
      ExecutionErrorBumpNonceVmOutOfGasError,
      ExecutionErrorBumpNonceVmBadJumpDestinationError,
      ExecutionErrorBumpNonceVmBadInstructionError,
      ExecutionErrorBumpNonceVmStackUnderflowError,
      ExecutionErrorBumpNonceVmOutOfStackError,
      ExecutionErrorBumpNonceVmSubStackUnderflowError,
    ],
  },
};

export default CallExecutionErrors;
