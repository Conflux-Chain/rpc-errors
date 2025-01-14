import exp from "constants";
import { InvalidParamsError } from "./invalidParams";

export type RlpIsTooShortErrorType = {
  name: "RlpIsTooShort";
} & RlpIsTooShortError;
export class RlpIsTooShortError extends InvalidParamsError {
  override name = "RlpIsTooShort";
  static pattern = /RlpIsTooShort/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type RlpInvalidLengthErrorType = {
  name: "RlpInvalidLength";
} & RlpInvalidLengthError;

export class RlpInvalidLengthError extends InvalidParamsError {
  override name = "RlpInvalidLength";
  static pattern = /RlpInvalidLength/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type UnrecoverablePubkeyErrorType = {
  name: "UnrecoverablePubkey";
} & UnrecoverablePubkeyError;

export class UnrecoverablePubkeyError extends InvalidParamsError {
  override name = "UnrecoverablePubkey";
  static pattern = /Can not recover pubkey for Ethereum like tx/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type TransactionAlreadyExistErrorType = {
  name: "TransactionAlreadyExist";
} & TransactionAlreadyExistError;

export class TransactionAlreadyExistError extends InvalidParamsError {
  override name = "TransactionAlreadyExist";
  static pattern = /tx already exist/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type TransactionTooBigErrorType = {
  name: "TransactionTooBig";
} & TransactionTooBigError;

export class TransactionTooBigError extends InvalidParamsError {
  override name = "TransactionTooBig";
  static pattern = /TooBig/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type TransactionChainIdMismatchErrorType = {
  name: "TransactionChainIdMismatch";
} & TransactionChainIdMismatchError;

export class TransactionChainIdMismatchError extends InvalidParamsError {
  override name = "TransactionChainIdMismatch";
  static pattern =
    /ChainIdMismatch\s*{\s*expected:\s*(\d+),\s*got:\s*(\d+),\s*space:\s*(\w+)\s*}/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type TransactionZeroGasPriceErrorType = {
  name: "TransactionZeroGasPrice";
} & TransactionZeroGasPriceError;

export class TransactionZeroGasPriceError extends InvalidParamsError {
  override name = "TransactionZeroGasPrice";
  static pattern = /ZeroGasPrice/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type TransactionInvalidReceiverErrorType = {
  name: "TransactionInvalidReceiver";
} & TransactionInvalidReceiverError;

export class TransactionInvalidReceiverError extends InvalidParamsError {
  override name = "TransactionInvalidReceiver";
  static pattern = /InvalidReceiver/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type TransactionNotEnoughBaseGasErrorType = {
  name: "TransactionNotEnoughBaseGas";
} & TransactionNotEnoughBaseGasError;

export class TransactionNotEnoughBaseGasError extends InvalidParamsError {
  override name = "TransactionNotEnoughBaseGas";
  static pattern = /NotEnoughBaseGas \{ required: \d+, got: \d+ \}/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type TransactionNonceTooDistantErrorType = {
  name: "TransactionNonceTooDistant";
} & TransactionNonceTooDistantError;

export class TransactionNonceTooDistantError extends InvalidParamsError {
  override name = "TransactionNonceTooDistant";
  static pattern =
    /Transaction 0x[a-fA-F0-9]+ is discarded due to in too distant future/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

/**
 * TransactionPoolError
 */

export type GasLimitExceededErrorType = {
  name: "GasLimitExceeded";
} & GasLimitExceededError;

export class GasLimitExceededError extends InvalidParamsError {
  override name = "GasLimitExceeded";
  static pattern = /transaction gas (\d+) exceeds the maximum value (\d+)/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type NonceTooDistantErrorType = {
  name: "NonceTooDistant";
} & NonceTooDistantError;

export class NonceTooDistantError extends InvalidParamsError {
  override name = "NonceTooDistant";

  static pattern =
    /Transaction (0x[0-9a-fA-F]+) is discarded due to in too distant future/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type NonceTooStaleErrorType = {
  name: "NonceTooStale";
} & NonceTooStaleError;

export class NonceTooStaleError extends InvalidParamsError {
  override name = "NonceTooStale";

  static pattern =
    /Transaction (0x[0-9a-fA-F]+) is discarded due to a too stale nonce/;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type OutOfBalanceErrorType = {
  name: "OutOfBalance";
} & OutOfBalanceError;

export class OutOfBalanceError extends InvalidParamsError {
  override name = "OutOfBalance";
  static pattern =
    /Transaction (0x[0-9a-fA-F]+) is discarded due to out of balance, needs (\d+) but account balance is (\d+)/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type TxPoolFullErrorType = {
  name: "TxPoolFull";
} & TxPoolFullError;

export class TxPoolFullError extends InvalidParamsError {
  override name = "TxPoolFull";
  static pattern = /txpool is full/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type HigherGasPriceNeededErrorType = {
  name: "HigherGasPriceNeeded";
} & HigherGasPriceNeededError;

export class HigherGasPriceNeededError extends InvalidParamsError {
  override name = "HigherGasPriceNeeded";
  static pattern =
    /Tx with same nonce already inserted. To replace it, you need to specify a gas price > (\d+)/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type StateDbErrorType = {
  name: "StateDbError";
} & StateDbError;

export class StateDbError extends InvalidParamsError {
  override name = "StateDbError";
  static pattern = /StateDbError/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}
