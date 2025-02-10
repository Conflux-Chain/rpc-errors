import { CallExecutionError } from "./callExecution";

export type NotExecutedDropOldNonceErrorType = {
  name: "NotExecutedDropOldNonce";
} & NotExecutedDropOldNonceError;

export class NotExecutedDropOldNonceError extends CallExecutionError {
  override name = "NotExecutedDropOldNonce";
  static pattern = /nonce is too old expected (\d+) got (\d+)/;

  static override parseError(_message: string, data = ""): boolean {
    return NotExecutedDropOldNonceError.pattern.test(data);
  }
}

export type NotExecutedDropInvalidRecipientAddressType = {
  name: "NotExecutedDropInvalidRecipientAddress";
} & NotExecutedDropInvalidRecipientAddress;

export class NotExecutedDropInvalidRecipientAddress extends CallExecutionError {
  override name = "NotExecutedDropInvalidRecipientAddress";
  static pattern = /invalid recipient address/;

  static override parseError(_message: string, data = ""): boolean {
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

  static override parseError(_message: string, data = ""): boolean {
    return NotExecutedDropNotEnoughGasLimitError.pattern.test(data);
  }
}

export type NotExecutedToReconsiderPackingInvalidNonceErrorType = {
  name: "NotExecutedToReconsiderPackingInvalidNonce";
} & NotExecutedToReconsiderPackingInvalidNonceError;

export class NotExecutedToReconsiderPackingInvalidNonceError extends CallExecutionError {
  override name = "NotExecutedToReconsiderPackingInvalidNonce";

  static pattern = /InvalidNonce \{ expected: \d+, got: \d+ \}/;
  static override parseError(message: string, data = ""): boolean {
    if (
      /(?:Can not estimate: )?transaction can not be executed/i.test(message) &&
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
  static override parseError(message: string, data = ""): boolean {
    if (
      /(?:Can not estimate: )?transaction can not be executed/i.test(message) &&
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
  static override parseError(message: string, data = ""): boolean {
    if (
      /(?:Can not estimate: )?transaction can not be executed/i.test(message) &&
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
  static override parseError(message: string, data = ""): boolean {
    if (
      /(?:Can not estimate: )?transaction can not be executed/i.test(message) &&
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
  static override parseError(message: string, data = ""): boolean {
    if (
      /(?:Can not estimate: )?transaction can not be executed/i.test(message) &&
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
  static override parseError(message: string, data = ""): boolean {
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
  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceNotEnoughCashError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

// OutOfGas
export type ExecutionErrorBumpNonceVmOutOfGasErrorType = {
  name: "ExecutionErrorBumpNonceVmOutOfGas";
} & ExecutionErrorBumpNonceVmOutOfGasError;

export class ExecutionErrorBumpNonceVmOutOfGasError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmOutOfGas";

  static pattern = /Out of gas/;
  static override parseError(message: string, data = ""): boolean {
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

// BadJumpDestination
export class ExecutionErrorBumpNonceVmBadJumpDestinationError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmBadJumpDestination";
  static pattern = /Bad jump destination ([0-9a-fA-F]+)/;
  static override parseError(message: string, data = ""): boolean {
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

// BadInstruction
export class ExecutionErrorBumpNonceVmBadInstructionError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmBadInstruction";
  static pattern = /Bad instruction ([0-9a-fA-F]+)/;
  static override parseError(message: string, data = ""): boolean {
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

// StackUnderflow
export class ExecutionErrorBumpNonceVmStackUnderflowError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmStackUnderflow";
  static pattern = /Stack underflow ([A-Z0-9]+) (\d+)\/(\d+)/;
  static override parseError(message: string, data = ""): boolean {
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

// OutOfStack
export class ExecutionErrorBumpNonceVmOutOfStackError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmOutOfStack";

  static pattern = /Out of stack ([A-Z0-9]+) (\d+)\/(\d+)/;
  static override parseError(message: string, data = ""): boolean {
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

// SubStackUnderflow

export class ExecutionErrorBumpNonceVmSubStackUnderflowError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmSubStackUnderflow";
  static pattern = /Subroutine stack underflow (\d+)\/(\d+)/;
  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmSubStackUnderflowError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmOutOfSubStackErrorType = {
  name: "ExecutionErrorBumpNonceVmOutOfSubStack";
} & ExecutionErrorBumpNonceVmOutOfSubStackError;

// OutOfSubStack
export class ExecutionErrorBumpNonceVmOutOfSubStackError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmOutOfSubStack";
  static pattern = /Out of subroutine stack (\d+)\/(\d+)/;
  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmOutOfSubStackError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmInvalidSubEntryErrorType = {
  name: "ExecutionErrorBumpNonceVmInvalidSubEntry";
} & ExecutionErrorBumpNonceVmInvalidSubEntryError;

// InvalidSubEntry
export class ExecutionErrorBumpNonceVmInvalidSubEntryError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmInvalidSubEntry";
  static pattern = /Invalid Subroutine Entry via BEGINSUB/;
  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmInvalidSubEntryError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmNotEnoughBalanceForStorageErrorType = {
  name: "ExecutionErrorBumpNonceVmNotEnoughBalanceForStorage";
} & ExecutionErrorBumpNonceVmNotEnoughBalanceForStorageError;

// NotEnoughBalanceForStorage
export class ExecutionErrorBumpNonceVmNotEnoughBalanceForStorageError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmNotEnoughBalanceForStorage";
  static pattern = /Not enough balance for storage (\d+)\/(\d+)/;

  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmNotEnoughBalanceForStorageError.pattern.test(
        data
      )
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmExceedStorageLimitErrorType = {
  name: "ExecutionErrorBumpNonceVmExceedStorageLimit";
} & ExecutionErrorBumpNonceVmExceedStorageLimitError;

// ExceedStorageLimit
export class ExecutionErrorBumpNonceVmExceedStorageLimitError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmExceedStorageLimit";
  static pattern = /Exceed storage limit/;

  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmExceedStorageLimitError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmBuiltInErrorType = {
  name: "ExecutionErrorBumpNonceVmBuiltIn";
} & ExecutionErrorBumpNonceVmBuiltInError;

// Built-in
export class ExecutionErrorBumpNonceVmBuiltInError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmBuiltIn";
  static pattern = /Built-in failed: (.+)/;

  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmBuiltInError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmInternalContractErrorType = {
  name: "ExecutionErrorBumpNonceVmInternalContract";
} & ExecutionErrorBumpNonceVmInternalContractError;

// InternalContract
export class ExecutionErrorBumpNonceVmInternalContractError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmInternalContract";
  static pattern = /InternalContract failed: (.+)/;

  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmInternalContractError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmStateDbErrorType = {
  name: "ExecutionErrorBumpNonceVmStateDb";
} & ExecutionErrorBumpNonceVmStateDbError;

// StateDbError

export class ExecutionErrorBumpNonceVmStateDbError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmStateDb";
  static pattern = /Irrecoverable state db error: (.+)/;

  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmStateDbError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmMutableCallInStaticContextErrorType = {
  name: "ExecutionErrorBumpNonceVmMutableCallInStaticContext";
} & ExecutionErrorBumpNonceVmMutableCallInStaticContextError;

// MutableCallInStaticContext
export class ExecutionErrorBumpNonceVmMutableCallInStaticContextError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmMutableCallInStaticContext";
  static pattern = /Mutable call in static context/;

  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmMutableCallInStaticContextError.pattern.test(
        data
      )
    ) {
      return true;
    }
    return false;
  }
}

// Wasm
export type ExecutionErrorBumpNonceVmWasmErrorType = {
  name: "ExecutionErrorBumpNonceVmWasm";
} & ExecutionErrorBumpNonceVmWasmError;

export class ExecutionErrorBumpNonceVmWasmError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmWasm";
  static pattern = /Internal error: (.+)/;

  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmWasmError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmOutOfBoundsErrorType = {
  name: "ExecutionErrorBumpNonceVmOutOfBounds";
} & ExecutionErrorBumpNonceVmOutOfBoundsError;

//OutOfBounds
export class ExecutionErrorBumpNonceVmOutOfBoundsError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmOutOfBounds";
  static pattern = /Out of bounds/;

  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmOutOfBoundsError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmRevertedByBytecodeErrorType = {
  name: "ExecutionErrorBumpNonceVmRevertedByBytecode";
} & ExecutionErrorBumpNonceVmRevertedByBytecodeError;

// Reverted
export class ExecutionErrorBumpNonceVmRevertedByBytecodeError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmRevertedByBytecode";
  static pattern = /Reverted by bytecode/;

  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmRevertedByBytecodeError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmInvalidAddressErrorType = {
  name: "ExecutionErrorBumpNonceVmInvalidAddress";
} & ExecutionErrorBumpNonceVmInvalidAddressError;

// InvalidAddress

export class ExecutionErrorBumpNonceVmInvalidAddressError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmInvalidAddress";
  static pattern = /InvalidAddress: (.+)/;

  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmInvalidAddressError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}

export type ExecutionErrorBumpNonceVmConflictAddressErrorType = {
  name: "ExecutionErrorBumpNonceVmConflictAddress";
} & ExecutionErrorBumpNonceVmConflictAddressError;

// ConflictAddress
export class ExecutionErrorBumpNonceVmConflictAddressError extends CallExecutionError {
  override name = "ExecutionErrorBumpNonceVmConflictAddress";
  static pattern = /Contract creation on an existing address: (.+)/;

  static override parseError(message: string, data = ""): boolean {
    if (
      message === "Transaction execution failed" &&
      ExecutionErrorBumpNonceVmConflictAddressError.pattern.test(data)
    ) {
      return true;
    }
    return false;
  }
}
