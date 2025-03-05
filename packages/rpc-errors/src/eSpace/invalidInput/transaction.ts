import { InvalidInputError } from "./invalidInput";

export class NonceOutdatedError extends InvalidInputError {
  override name = "NonceOutdated";
  static pattern = /nonce is too old expected/;

  static override parseError(message: string): boolean {
    return NonceOutdatedError.pattern.test(message);
  }
}

export class InsufficientGasLimitError extends InvalidInputError {
  override name = "InsufficientGasLimit";
  static pattern = /not enough gas limit with respected to tx size: expected/;

  static override parseError(message: string): boolean {
    return InsufficientGasLimitError.pattern.test(message);
  }
}
