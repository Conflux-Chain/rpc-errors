import { CallExecutionError } from "./callExecution";

export type NotExecutedDropOldNonceErrorType = {
  name: "NotExecutedDropOldNonce";
} & NotExecutedDropOldNonceError;

export class NotExecutedDropOldNonceError extends CallExecutionError {
  override name = "NotExecutedDropOldNonce";
  static pattern = /nonce is too old expected (\d+) got (\d+)/;
  constructor(message: string, data?: any) {
    super(message, data);
  }

  static override parseError(message: string, data?: any): boolean {
    return NotExecutedDropOldNonceError.pattern.test(data);
  }
}

export type NotExecutedDropInvalidRecipientAddressType = {
  name: "NotExecutedDropInvalidRecipientAddress";
} & NotExecutedDropInvalidRecipientAddress;

export class NotExecutedDropInvalidRecipientAddress extends CallExecutionError {
  override name = "NotExecutedDropInvalidRecipientAddress";
  static pattern = /invalid recipient address/;
  constructor(message: string, data?: any) {
    super(message, data);
  }

  static override parseError(message: string, data?: any): boolean {
    return NotExecutedDropInvalidRecipientAddress.pattern.test(data);
  }
}

export type NotExecutedDropNotEnoughGasLimitErrorType = {
  name: "NotExecutedDropNotEnoughGasLimit";
} & NotExecutedDropNotEnoughGasLimitError;

export class NotExecutedDropNotEnoughGasLimitError extends CallExecutionError {
  override name = "NotExecutedDropNotEnoughGasLimit";
  static pattern =
    /not enough gas limit with respected to tx size: expected (\d+) got (\d+)/;
  constructor(message: string, data?: any) {
    super(message, data);
  }

  static override parseError(message: string, data?: any): boolean {
    return NotExecutedDropNotEnoughGasLimitError.pattern.test(data);
  }
}

export type NotExecutedToReconsiderPackingInvalidNonceErrorType = {
  name: "NotExecutedToReconsiderPackingInvalidNonce";
} & NotExecutedToReconsiderPackingInvalidNonceError;

export class NotExecutedToReconsiderPackingInvalidNonceError extends CallExecutionError {
  override name = "NotExecutedToReconsiderPackingInvalidNonce";

  constructor(message: string, data?: any) {
    super(message, data);
  }

  static pattern = /InvalidNonce \{ expected: \d+, got: \d+ \}/;
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction can not be executed" &&
      NotExecutedToReconsiderPackingInvalidNonceError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type NotExecutedToReconsiderPackingEpochHeightOutOfBoundErrorType = {
  name: "NotExecutedToReconsiderPackingEpochHeightOutOfBound";
} & NotExecutedToReconsiderPackingEpochHeightOutOfBoundError;

export class NotExecutedToReconsiderPackingEpochHeightOutOfBoundError extends CallExecutionError {
  override name = "NotExecutedToReconsiderPackingEpochHeightOutOfBound";

  static pattern =
    /EpochHeightOutOfBound \{ block_height: \d+, set: \d+, transaction_epoch_bound: \d+ \}/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction can not be executed" &&
      NotExecutedToReconsiderPackingEpochHeightOutOfBoundError.pattern.test(
        data
      )
    ) {
      return true;
    }
    return false;
  }
}

export type NotExecutedToReconsiderPackingNotEnoughCashFromSponsorErrorType = {
  name: "NotExecutedToReconsiderPackingNotEnoughCashFromSponsor";
} & NotExecutedToReconsiderPackingNotEnoughCashFromSponsorError;

export class NotExecutedToReconsiderPackingNotEnoughCashFromSponsorError extends CallExecutionError {
  override name = "NotExecutedToReconsiderPackingNotEnoughCashFromSponsor";
  static pattern =
    /NotEnoughCashFromSponsor \{ required_gas_cost: \d+, gas_sponsor_balance: \d+, required_storage_cost: \d+, storage_sponsor_balance: \d+ \}/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction can not be executed" &&
      NotExecutedToReconsiderPackingNotEnoughCashFromSponsorError.pattern.test(
        data
      )
    ) {
      return true;
    }
    return false;
  }
}

export type NotExecutedToReconsiderPackingSenderDoesNotExistErrorType = {
  name: "NotExecutedToReconsiderPackingSenderDoesNotExist";
} & NotExecutedToReconsiderPackingSenderDoesNotExistError;

export class NotExecutedToReconsiderPackingSenderDoesNotExistError extends CallExecutionError {
  override name = "NotExecutedToReconsiderPackingSenderDoesNotExist";
  static pattern = /SenderDoesNotExist/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction can not be executed" &&
      NotExecutedToReconsiderPackingSenderDoesNotExistError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type NotExecutedToReconsiderPackingNotEnoughBaseFeeErrorType = {
  name: "NotExecutedToReconsiderPackingNotEnoughBaseFee";
} & NotExecutedToReconsiderPackingNotEnoughBaseFeeError;

export class NotExecutedToReconsiderPackingNotEnoughBaseFeeError extends CallExecutionError {
  override name = "NotExecutedToReconsiderPackingNotEnoughBaseFee";
  static pattern = /NotEnoughBaseFee \{ expected: \d+, got: \d+ \}/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction can not be executed" &&
      NotExecutedToReconsiderPackingNotEnoughBaseFeeError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmRevertedErrorType = {
  name: "ExecutionErrorBumpNonceVmReverted";
} & ExecutionErrorBumpNonceVmRevertedError;

export class ExecutionErrorBumpNonceVmRevertedError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmReverted";
  static pattern = /0x[0-9a-f]*/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction reverted" &&
      ExecutionErrorBumpNonceVmRevertedError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceNotEnoughCashErrorType = {
  name: "ExecutionErrorBumpNonceNotEnoughCash";
} & ExecutionErrorBumpNonceNotEnoughCashError;

export class ExecutionErrorBumpNonceNotEnoughCashError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceNotEnoughCash";
  static pattern =
    /NotEnoughCash \{ required: \d+, got: \d+, actual_gas_cost: \d+, max_storage_limit_cost: \d+ \}/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceNotEnoughCashError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmOutOfGasErrorType = {
  name: "ExecutionErrorBumpNonceVmOutOfGas";
} & ExecutionErrorBumpNonceVmOutOfGasError;

export class ExecutionErrorBumpNonceVmOutOfGasError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmOutOfGas";

  static pattern = /OutOfGas/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmOutOfGasError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmBadJumpDestinationErrorType = {
  name: "ExecutionErrorBumpNonceVmBadJumpDestination";
} & ExecutionErrorBumpNonceVmBadJumpDestinationError;

export class ExecutionErrorBumpNonceVmBadJumpDestinationError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmBadJumpDestination";
  static pattern = /BadJumpDestination \{ destination: \d+ \}/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmBadJumpDestinationError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmBadInstructionErrorType = {
  name: "ExecutionErrorBumpNonceVmBadInstruction";
} & ExecutionErrorBumpNonceVmBadInstructionError;

export class ExecutionErrorBumpNonceVmBadInstructionError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmBadInstruction";
  static pattern = /BadInstruction \{ instruction: \d+ \}/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmBadInstructionError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmStackUnderflowErrorType = {
  name: "ExecutionErrorBumpNonceVmStackUnderflow";
} & ExecutionErrorBumpNonceVmStackUnderflowError;
export class ExecutionErrorBumpNonceVmStackUnderflowError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmStackUnderflow";
  static pattern =
    /StackUnderflow \{ instruction: "[A-Z]+", wanted: \d+, on_stack: \d+ \}/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmStackUnderflowError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmOutOfStackErrorType = {
  name: "ExecutionErrorBumpNonceVmOutOfStack";
} & ExecutionErrorBumpNonceVmOutOfStackError;

export class ExecutionErrorBumpNonceVmOutOfStackError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmOutOfStack";

  static pattern =
    /OutOfStack \{ instruction: "[A-Z0-9]+", wanted: \d+, limit: \d+ \}/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmOutOfStackError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmSubStackUnderflowErrorType = {
  name: "ExecutionErrorBumpNonceVmSubStackUnderflow";
} & ExecutionErrorBumpNonceVmSubStackUnderflowError;

export class ExecutionErrorBumpNonceVmSubStackUnderflowError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmSubStackUnderflow";
  static pattern = /SubStackUnderflow \{ wanted: \d+, on_stack: \d+ \}/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
  static override parseError(message: string, data?: any): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmSubStackUnderflowError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}
