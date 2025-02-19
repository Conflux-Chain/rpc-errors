import { InvalidParamsError } from "./invalidParams";

export class MissingHexPrefixError extends InvalidParamsError {
  override name = "MissingHexPrefix";
  static pattern = /missing 0x prefix/;

  static override parseError(message: string): boolean {
    return MissingHexPrefixError.pattern.test(message);
  }
}

export class InvalidBlockTypeError extends InvalidParamsError {
  override name = "InvalidBlockType";
  static pattern =
    /expected a block number or 'latest', 'earliest' or 'pending'/;

  static override parseError(message: string): boolean {
    return InvalidBlockTypeError.pattern.test(message);
  }
}

export class SpecifiedBlockNotExecutedError extends InvalidParamsError {
  override name = "SpecifiedBlockNotExecuted";
  static pattern =
    /Specified epoch (.*) is not executed, the latest state epoch is/;

  static override parseError(_message: string, data = ""): boolean {
    return SpecifiedBlockNotExecutedError.pattern.test(data);
  }
}

export class EmptyBlockStringError extends InvalidParamsError {
  override name = "EmptyBlockString";
  static pattern =
    /Invalid block number: cannot parse integer from empty string/;

  static override parseError(message: string): boolean {
    return EmptyBlockStringError.pattern.test(message);
  }
}

export class InvalidDigitBlockError extends InvalidParamsError {
  override name = "InvalidDigitBlock";
  static pattern = /invalid digit found in string/;

  static override parseError(message: string): boolean {
    return InvalidDigitBlockError.pattern.test(message);
  }
}

export class InvalidHexLengthError extends InvalidParamsError {
  override name = "InvalidHexLengthError";
  static pattern = /invalid hex length/;

  static override parseError(message: string): boolean {
    return InvalidHexLengthError.pattern.test(message);
  }
}

export class LatestMinedNotExecutedError extends InvalidParamsError {
  override name = "LatestMinedNotExecuted";
  static pattern = /Latest mined epoch is not executed/;

  static override parseError(_message: string, data = ""): boolean {
    return LatestMinedNotExecutedError.pattern.test(data);
  }
}
