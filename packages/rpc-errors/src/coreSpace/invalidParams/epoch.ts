import { InvalidParamsError } from "./invalidParams";

export type InvalidEpochTypeErrorType = InvalidEpochTypeError & {
  name: "InvalidEpochType";
};
export class InvalidEpochTypeError extends InvalidParamsError {
  override name = "InvalidEpochType";
  static pattern =
    /expected an epoch number or 'latest_mined', 'latest_state', 'latest_checkpoint', 'latest_finalized', 'latest_confirmed' or 'earliest'./;
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}

export type EpochNumberTooLargeErrorType = EpochNumberTooLargeError & {
  name: "EpochNumberTooLarge";
};
export class EpochNumberTooLargeError extends InvalidParamsError {
  override name = "EpochNumberTooLarge";
  static pattern = /expected a numbers with less than largest epoch number/;
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}

export class EpochNumberPosOverflowError extends InvalidParamsError {
  override name = "EpochNumberPosOverflow";
  static pattern = /number too large to fit in target type/;
  constructor(message: string, public override readonly data?: any) {
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
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}

export type InvalidDigitEpochErrorType = InvalidDigitEpochError & {
  name: "InvalidDigitEpoch";
};
export class InvalidDigitEpochError extends InvalidParamsError {
  override name = "InvalidDigitEpoch";
  static pattern = /invalid digit found in string/;
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}

export type MissingHexPrefixErrorType = MissingHexPrefixError & {
  name: "MissingHexPrefix";
};

export class MissingHexPrefixError extends InvalidParamsError {
  override name = "MissingHexPrefix";
  static pattern = /missing 0x prefix/;
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}
