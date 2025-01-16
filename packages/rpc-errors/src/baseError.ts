export interface BaseErrorType {
  name: string;
  code: number;
}

export class BaseError extends Error {
  readonly code: number;
  static readonly code: number;
  override name: string = "BaseError";
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}
