import type { RegisterErrorsType } from "../../types";
import {
  InvalidBase32AddressError,
  InvalidSize160AddressError,
  UnexpectedRpcAddressNetworkError,
} from "./address";
import { BlockHashesLimitExceededError } from "./block";

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
import { ExceededLogsLimitError, MissingFilterParametersError } from "./logs";
import { StorageLimitOutOfRangeError } from "./storage";
import { ExceededTopicsLimitError } from "./topic";
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
  [InvalidParamsError.code]: {
    code: InvalidParamsError.code,
    baseError: InvalidParamsError,
    detailErrors: [
      InvalidEpochTypeError,
      EmptyEpochStringError,
      InvalidDigitEpochError,
      EpochNumberTooLargeError,
      MissingHexPrefixError,
      InvalidHashTypeError,
      SpecifiedEpochNotExecutedError,
      LatestMinedNotExecutedError,
      NonExistentBlockHeaderError,
      InvalidBase32AddressError,
      InvalidSize160AddressError,
      RlpIsTooShortError,
      RlpInvalidLengthError,
      UnrecoverablePubkeyError,
      TransactionAlreadyExistError,
      TransactionTooBigError,
      TransactionChainIdMismatchError,
      TransactionZeroGasPriceError,
      TransactionInvalidReceiverError,
      TransactionNotEnoughBaseGasError,
      TransactionNonceTooDistantError,
      GasLimitExceededError,
      NonceTooStaleError,
      OutOfBalanceError,
      HigherGasPriceNeededError,
      UnexpectedRpcAddressNetworkError,
      BlockHashesLimitExceededError,
      ExceededTopicsLimitError,
      MissingFilterParametersError,
      ExceededLogsLimitError,
      StorageLimitOutOfRangeError,
    ],
  },
};

export default InvalidParamsErrors;
