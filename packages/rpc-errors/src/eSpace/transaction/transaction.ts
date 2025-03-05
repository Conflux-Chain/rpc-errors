import { BaseError } from "../../baseError";

export type TransactionErrorType = TransactionRejectedError & {
  name: "TransactionError";
};

export class TransactionRejectedError extends BaseError {
  static override code = -32003;
  override readonly code = TransactionRejectedError.code;
  override name = "TransactionError";
  constructor(message: string, public readonly data = "") {
    super(TransactionRejectedError.code, message);
  }
  static parseError(_message: string, _data = ""): boolean {
    return true;
  }
}

export class NonceTooHighError extends TransactionRejectedError {
  override name = "NonceTooHigh";

  static pattern = /nonce too high/;
  static override parseError(message: string): boolean {
    return NonceTooHighError.pattern.test(message);
  }
}

export class MaxPriorityFeeExceedsMaxFeeError extends TransactionRejectedError {
  override name = "MaxPriorityFeeExceedsMaxFee";

  static pattern = /max priority fee per gas higher than max fee per gas/;
  static override parseError(message: string): boolean {
    return MaxPriorityFeeExceedsMaxFeeError.pattern.test(message);
  }
}
