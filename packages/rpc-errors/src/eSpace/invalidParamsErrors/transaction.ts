import { InvalidParamsError } from "./invalidParams";

export class FailedToDecodeSignedTransactionError extends InvalidParamsError {
  override name = "FailedToDecodeSignedTransaction";

  static pattern = /failed to decode signed transaction/;

  static override parseError(message: string): boolean {
    return FailedToDecodeSignedTransactionError.pattern.test(message);
  }
}

export class InsufficientGasError extends InvalidParamsError {
  override name = "InsufficientGas";

  static pattern = /Transaction gas .+ less than intrinsic gas/;

  static override parseError(_message: string, data: string): boolean {
    return InsufficientGasError.pattern.test(data);
  }
}

export class InsufficientFundsError extends InvalidParamsError {
  override name = "InsufficientFundsError";

  static pattern =
    /insufficient funds for gas \* price \+ value: NotEnoughCash \{ required: \d+, got: \d+/;

  static override parseError(message: string): boolean {
    return InsufficientFundsError.pattern.test(message);
  }
}

export class ExceededMaxGasError extends InvalidParamsError {
  override name = "ExceededMaxGas";

  static pattern = /specified gas is larger than max gas/;

  static override parseError(message: string, data: string): boolean {
    return message === "gas" && ExceededMaxGasError.pattern.test(data);
  }
}

export class UnrecognizedTransactionTypeError extends InvalidParamsError {
  override name = "UnrecognizedTransactionType";
  static pattern = /Unrecognized transaction type/;
  static override parseError(message: string, data: string): boolean {
    return (
      message === "type" && UnrecognizedTransactionTypeError.pattern.test(data)
    );
  }
}
