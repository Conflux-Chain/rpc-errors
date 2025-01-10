import { InvalidParamsError } from "./invalidParams";

export type InvalidEpochTypeErrorType = InvalidEpochTypeError & {
  name: "InvalidEpochType";
};
export class InvalidEpochTypeError extends InvalidParamsError {
  override name = "InvalidEpochType";
  static pattern =
    /expected an epoch number or 'latest_mined', 'latest_state', 'latest_checkpoint', 'latest_finalized', 'latest_confirmed'/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type EpochNumberTooLargeErrorType = EpochNumberTooLargeError & {
  name: "EpochNumberTooLarge";
};
export class EpochNumberTooLargeError extends InvalidParamsError {
  override name = "EpochNumberTooLarge";
  static pattern = /expected a numbers with less than largest epoch number/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type EmptyEpochStringErrorType = EmptyEpochStringError & {
  name: "EmptyEpochString";
};
export class EmptyEpochStringError extends InvalidParamsError {
  override name = "EmptyEpochString";
  static pattern =
    /Invalid epoch number: cannot parse integer from empty string/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type InvalidDigitEpochErrorType = InvalidDigitEpochError & {
  name: "InvalidDigitEpoch";
};
export class InvalidDigitEpochError extends InvalidParamsError {
  override name = "InvalidDigitEpoch";
  static pattern = /invalid digit found in string/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type MissingHexPrefixErrorType = MissingHexPrefixError & {
  name: "MissingHexPrefix";
};

export class MissingHexPrefixError extends InvalidParamsError {
  override name = "MissingHexPrefix";
  static pattern = /missing 0x prefix/;
  constructor(message: string, data?: any) {
    super(message, data);
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
  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export type LatestMinedNotExecutedErrorType = LatestMinedNotExecutedError & {
  name: "LatestMinedNotExecuted";
};
export class LatestMinedNotExecutedError extends InvalidParamsError {
  override name = "LatestMinedNotExecuted";
  static pattern = /Latest mined epoch is not executed/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}
