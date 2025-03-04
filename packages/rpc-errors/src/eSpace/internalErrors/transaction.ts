import { InternalError } from "./Internal";

export class IncorrectTransactionSpaceError extends InternalError {
  override name = "IncorrectTransactionSpace";

  static pattern = /Incorrect transaction space/;

  static override parseError(message: string): boolean {
    return IncorrectTransactionSpaceError.pattern.test(message);
  }
}

export class InvalidTransactionSignatureError extends InternalError {
  override name = "InvalidTransactionSignature";

  static pattern = /invalid transaction signature/;

  static override parseError(message: string): boolean {
    return InvalidTransactionSignatureError.pattern.test(message);
  }
}

export class ExceedsBlockGasLimitError extends InternalError {
  override name = "ExceedsBlockGasLimit";

  static pattern = /exceeds block gas limit/;

  static override parseError(_message: string, _data?: string): boolean {
    return ExceedsBlockGasLimitError.pattern.test(_message);
  }
}


export class TransactionUnderpricedError extends InternalError {
  override name = "TransactionUnderpriced";

  static pattern = /transaction underpriced/;
  
  static override parseError(_message: string, _data?: string): boolean {
    return TransactionUnderpricedError.pattern.test(_message);
  }
}