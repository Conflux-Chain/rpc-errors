import { BaseError } from "../../baseError";

export type TransactionErrorType = TransactionError & {
  name: "TransactionError";
};

export class TransactionError extends BaseError {
  static override code = -32003;
  override readonly code = TransactionError.code;
  override name = "TransactionError";
  constructor(message: string, public readonly data = "") {
    super(TransactionError.code, message);
  }
  static parseError(_message: string, _data = ""): boolean {
    return true;
  }
}

export class NonceTooHighError extends TransactionError {
  override name = "NonceTooHigh";

  static pattern = /nonce too high/;
  static override parseError(message: string): boolean {
    return NonceTooHighError.pattern.test(message);
  }
}
