import { InvalidParamsError } from "./invalidParams";

export type InvalidEpochTypeErrorType = InvalidEpochTypeError & {
  name: "InvalidEpochType";
};
export class InvalidEpochTypeError extends InvalidParamsError {
  override name = "InvalidEpochType";
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}

export type EpochNumberTooLargeErrorType = EpochNumberTooLargeError & {
  name: "EpochNumberTooLarge";
};
export class EpochNumberTooLargeError extends InvalidParamsError {
  override name = "EpochNumberTooLarge";
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}

export type EmptyEpochStringErrorType = EmptyEpochStringError & {
  name: "EmptyEpochString";
};
export class EmptyEpochStringError extends InvalidParamsError {
  override name = "EmptyEpochString";
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}

export type InvalidDigitEpochErrorType = InvalidDigitEpochError & {
  name: "InvalidDigitEpoch";
};
export class InvalidDigitEpochError extends InvalidParamsError {
  override name = "InvalidDigitEpoch";
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}

export type MissingHexPrefixErrorType = MissingHexPrefixError & {
  name: "MissingHexPrefix";
};

export class MissingHexPrefixError extends InvalidParamsError {
  override name = "MissingHexPrefix";
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}
