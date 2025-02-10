import type { RegisterErrorsType } from "../types";
import CallExecutionErrors from "./callExecutionErrors";
import CustomErrors from "./customErrors";
import InternalErrors from "./internalErrors";
import InvalidParamsErrors from "./invalidParamsErrors";
import { InvalidRequestErrors } from "./JSONRPC";

// Export error types
export type {
  // Invalid Params Errors
  InvalidParamsErrorType,
  EmptyEpochStringErrorType,
  EpochNumberTooLargeErrorType,
  InvalidDigitEpochErrorType,
  InvalidEpochTypeErrorType,
  MissingHexPrefixErrorType,
} from "./invalidParamsErrors";

// Export Internal Error types
export type { InternalErrorType } from "./internalErrors/Internal";

// Export Call Execution Error types
export type { CallExecutionErrorType } from "./callExecutionErrors/callExecution";
export type {
  NotExecutedDropOldNonceErrorType,
  NotExecutedDropInvalidRecipientAddressType,
  NotExecutedDropNotEnoughGasLimitErrorType,
  NotExecutedToReconsiderPackingInvalidNonceErrorType,
  NotExecutedToReconsiderPackingEpochHeightOutOfBoundErrorType,
  NotExecutedToReconsiderPackingNotEnoughCashFromSponsorErrorType,
  NotExecutedToReconsiderPackingSenderDoesNotExistErrorType,
  NotExecutedToReconsiderPackingNotEnoughBaseFeeErrorType,
  ExecutionErrorBumpNonceVmRevertedErrorType,
  ExecutionErrorBumpNonceNotEnoughCashErrorType,
  ExecutionErrorBumpNonceVmOutOfGasErrorType,
  ExecutionErrorBumpNonceVmBadJumpDestinationErrorType,
  ExecutionErrorBumpNonceVmBadInstructionErrorType,
  ExecutionErrorBumpNonceVmStackUnderflowErrorType,
  ExecutionErrorBumpNonceVmOutOfStackErrorType,
  ExecutionErrorBumpNonceVmSubStackUnderflowErrorType,
  ExecutionErrorBumpNonceVmOutOfSubStackErrorType,
  ExecutionErrorBumpNonceVmInvalidSubEntryErrorType,
  ExecutionErrorBumpNonceVmNotEnoughBalanceForStorageErrorType,
  ExecutionErrorBumpNonceVmExceedStorageLimitErrorType,
  ExecutionErrorBumpNonceVmBuiltInErrorType,
  ExecutionErrorBumpNonceVmInternalContractErrorType,
  ExecutionErrorBumpNonceVmStateDbErrorType,
  ExecutionErrorBumpNonceVmMutableCallInStaticContextErrorType,
  ExecutionErrorBumpNonceVmWasmErrorType,
  ExecutionErrorBumpNonceVmOutOfBoundsErrorType,
  ExecutionErrorBumpNonceVmRevertedByBytecodeErrorType,
  ExecutionErrorBumpNonceVmInvalidAddressErrorType,
  ExecutionErrorBumpNonceVmConflictAddressErrorType,
} from "./callExecutionErrors/executionOutcome";

// Export all error classes
export { InvalidParamsError } from "./invalidParamsErrors/invalidParams";
export {
  EmptyEpochStringError,
  EpochNumberTooLargeError,
  InvalidDigitEpochError,
  InvalidEpochTypeError,
  MissingHexPrefixError,
  LatestMinedNotExecutedError,
  SpecifiedEpochNotExecutedError,
} from "./invalidParamsErrors/epoch";
export { InvalidHashTypeError } from "./invalidParamsErrors/hash";
export { NonExistentBlockHeaderError } from "./invalidParamsErrors/fee";
export {
  InvalidBase32AddressError,
  InvalidSize160AddressError,
  UnexpectedRpcAddressNetworkError,
} from "./invalidParamsErrors/address";
export {
  BlockHashesLimitExceededError,
  BlockNotFoundError,
  PivotChainAssumptionFailedError,
} from "./invalidParamsErrors/block";
export { ExceededTopicsLimitError } from "./invalidParamsErrors/topic";
export {
  ExceededLogsLimitError,
  MissingFilterParametersError,
} from "./invalidParamsErrors/logs";
export { RewardNotCalculatedError } from "./invalidParamsErrors/reward";
export { StorageLimitOutOfRangeError } from "./invalidParamsErrors/storage";
export {
  RlpInvalidLengthError,
  RlpIsTooShortError,
  TransactionAlreadyExistError,
  TransactionChainIdMismatchError,
  TransactionInvalidReceiverError,
  TransactionNonceTooDistantError,
  TransactionNotEnoughBaseGasError,
  TransactionTooBigError,
  TransactionZeroGasPriceError,
  UnrecoverablePubkeyError,
  GasLimitExceededError,
  NonceTooStaleError,
  OutOfBalanceError,
  HigherGasPriceNeededError,
} from "./invalidParamsErrors/transaction";

// Export Internal errors
export { InternalError } from "./internalErrors/Internal";
export { NonExistentBlockHeaderError as InternalNonExistentBlockHeaderError } from "./internalErrors/fee";

// Export Call Execution errors
export { CallExecutionError } from "./callExecutionErrors/callExecution";
export {
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
  ExecutionErrorBumpNonceVmOutOfSubStackError,
  ExecutionErrorBumpNonceVmInvalidSubEntryError,
  ExecutionErrorBumpNonceVmNotEnoughBalanceForStorageError,
  ExecutionErrorBumpNonceVmExceedStorageLimitError,
  ExecutionErrorBumpNonceVmBuiltInError,
  ExecutionErrorBumpNonceVmInternalContractError,
  ExecutionErrorBumpNonceVmStateDbError,
  ExecutionErrorBumpNonceVmMutableCallInStaticContextError,
  ExecutionErrorBumpNonceVmWasmError,
  ExecutionErrorBumpNonceVmOutOfBoundsError,
  ExecutionErrorBumpNonceVmRevertedByBytecodeError,
  ExecutionErrorBumpNonceVmInvalidAddressError,
  ExecutionErrorBumpNonceVmConflictAddressError,
} from "./callExecutionErrors/executionOutcome";

export type CoreSpaceErrorsType = RegisterErrorsType[];

const coreSpaceErrors: CoreSpaceErrorsType = [
  InvalidParamsErrors,
  InternalErrors,
  CustomErrors,
  CallExecutionErrors,
  InvalidRequestErrors,
];

export default coreSpaceErrors;
