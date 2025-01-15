import type { RegisterErrorsType } from "../../types";
import {
  InvalidBase32AddressError,
  InvalidSize160AddressError,
} from "./address";
import {
  EmptyEpochStringError,
  EpochNumberTooLargeError,
  InvalidDigitEpochError,
  InvalidEpochTypeError,
  LatestMinedNotExecutedError,
  MissingHexPrefixError,
  SpecifiedEpochNotExecutedError,
} from "./epoch";
import { NonExistentBlockHeaderError } from "./fee";
import { InvalidHashTypeError } from "./hash";
import { InvalidParamsError } from "./invalidParams";
import {
  GasLimitExceededError,
  HigherGasPriceNeededError,
  NonceTooStaleError,
  OutOfBalanceError,
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
} from "./transaction";

export type { InvalidParamsErrorType } from "./invalidParams";

export type {
  EmptyEpochStringErrorType,
  EpochNumberTooLargeErrorType,
  InvalidDigitEpochErrorType,
  InvalidEpochTypeErrorType,
  MissingHexPrefixErrorType,
} from "./epoch";

const InvalidParamsErrors: RegisterErrorsType = {
  codeMap: [{ code: InvalidParamsError.code, error: InvalidParamsError }],
  messageMap: [
    { pattern: InvalidEpochTypeError.pattern, error: InvalidEpochTypeError },
    {
      pattern: EmptyEpochStringError.pattern,
      error: EmptyEpochStringError,
    },
    {
      pattern: InvalidDigitEpochError.pattern,
      error: InvalidDigitEpochError,
    },
    {
      pattern: EpochNumberTooLargeError.pattern,
      error: EpochNumberTooLargeError,
    },
    {
      pattern: MissingHexPrefixError.pattern,
      error: MissingHexPrefixError,
    },
    {
      pattern: InvalidHashTypeError.pattern,
      error: InvalidHashTypeError,
    },
    {
      pattern: SpecifiedEpochNotExecutedError.pattern,
      error: SpecifiedEpochNotExecutedError,
    },
    {
      pattern: LatestMinedNotExecutedError.pattern,
      error: LatestMinedNotExecutedError,
    },
    {
      pattern: NonExistentBlockHeaderError.pattern,
      error: NonExistentBlockHeaderError,
    },
    {
      pattern: InvalidBase32AddressError.pattern,
      error: InvalidBase32AddressError,
    },
    {
      pattern: InvalidSize160AddressError.pattern,
      error: InvalidSize160AddressError,
    },
    {
      pattern: RlpIsTooShortError.pattern,
      error: RlpIsTooShortError,
    },
    {
      pattern: RlpInvalidLengthError.pattern,
      error: RlpInvalidLengthError,
    },
    {
      pattern: UnrecoverablePubkeyError.pattern,
      error: UnrecoverablePubkeyError,
    },
    {
      pattern: TransactionAlreadyExistError.pattern,
      error: TransactionAlreadyExistError,
    },
    {
      pattern: TransactionTooBigError.pattern,
      error: TransactionTooBigError,
    },
    {
      pattern: TransactionChainIdMismatchError.pattern,
      error: TransactionChainIdMismatchError,
    },
    {
      pattern: TransactionZeroGasPriceError.pattern,
      error: TransactionZeroGasPriceError,
    },
    {
      pattern: TransactionInvalidReceiverError.pattern,
      error: TransactionInvalidReceiverError,
    },
    {
      pattern: TransactionNotEnoughBaseGasError.pattern,
      error: TransactionNotEnoughBaseGasError,
    },
    {
      pattern: TransactionNonceTooDistantError.pattern,
      error: TransactionNonceTooDistantError,
    },

    {
      pattern: GasLimitExceededError.pattern,
      error: GasLimitExceededError,
    },
    {
      pattern: NonceTooStaleError.pattern,
      error: NonceTooStaleError,
    },
    {
      pattern: OutOfBalanceError.pattern,
      error: OutOfBalanceError,
    },
    {
      pattern: HigherGasPriceNeededError.pattern,
      error: HigherGasPriceNeededError,
    },
  ],
};

export default InvalidParamsErrors;
