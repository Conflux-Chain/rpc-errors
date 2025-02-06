import { InvalidParamsError } from "./invalidParams";

export type InvalidEpochTypeErrorType = InvalidEpochTypeError & {
  name: "InvalidEpochType";
};
export class InvalidEpochTypeError extends InvalidParamsError {
  override name = "InvalidEpochType";
  static pattern =
    /expected an epoch number or 'latest_mined', 'latest_state', 'latest_checkpoint', 'latest_finalized', 'latest_confirmed'/;

  static override parseError(message: string): boolean {
    return InvalidEpochTypeError.pattern.test(message);
  }
}

export type EpochNumberTooLargeErrorType = EpochNumberTooLargeError & {
  name: "EpochNumberTooLarge";
};
export class EpochNumberTooLargeError extends InvalidParamsError {
  override name = "EpochNumberTooLarge";
  static pattern = /expected a numbers with less than largest epoch number/;

  static override parseError(message: string): boolean {
    return EpochNumberTooLargeError.pattern.test(message);
  }
}

export type EmptyEpochStringErrorType = EmptyEpochStringError & {
  name: "EmptyEpochString";
};
export class EmptyEpochStringError extends InvalidParamsError {
  override name = "EmptyEpochString";
  static pattern =
    /Invalid epoch number: cannot parse integer from empty string/;

  static override parseError(message: string): boolean {
    return EmptyEpochStringError.pattern.test(message);
  }
}

export type InvalidDigitEpochErrorType = InvalidDigitEpochError & {
  name: "InvalidDigitEpoch";
};
export class InvalidDigitEpochError extends InvalidParamsError {
  override name = "InvalidDigitEpoch";
  static pattern = /invalid digit found in string/;

  static override parseError(message: string): boolean {
    return InvalidDigitEpochError.pattern.test(message);
  }
}

export type MissingHexPrefixErrorType = MissingHexPrefixError & {
  name: "MissingHexPrefix";
};

export class MissingHexPrefixError extends InvalidParamsError {
  override name = "MissingHexPrefix";
  static pattern = /missing 0x prefix/;

  static override parseError(message: string): boolean {
    return MissingHexPrefixError.pattern.test(message);
  }
}

export type SpecifiedEpochNotExecutedErrorType =
  SpecifiedEpochNotExecutedError & {
    name: "SpecifiedEpochNotExecuted";
  };
export class SpecifiedEpochNotExecutedError extends InvalidParamsError {
  override name = "SpecifiedEpochNotExecuted";
  static pattern =
    /Specified epoch (.*) is not executed, the latest state epoch is/;

  static override parseError(_message: string, data = ""): boolean {
    return SpecifiedEpochNotExecutedError.pattern.test(data);
  }
}

export type LatestMinedNotExecutedErrorType = LatestMinedNotExecutedError & {
  name: "LatestMinedNotExecuted";
};
export class LatestMinedNotExecutedError extends InvalidParamsError {
  override name = "LatestMinedNotExecuted";
  static pattern = /Latest mined epoch is not executed/;

  static override parseError(_message: string, data = ""): boolean {
    return LatestMinedNotExecutedError.pattern.test(data);
  }
}
