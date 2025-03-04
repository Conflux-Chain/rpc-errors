import { InvalidParamsError } from "./invalidParams";

export class FailedToDecodeSignedTransactionError extends InvalidParamsError {
  override name = "FailedToDecodeSignedTransaction";

  static pattern = /failed to decode signed transaction/;

  static override parseError(message: string): boolean {
    return FailedToDecodeSignedTransactionError.pattern.test(message);
  }
}


