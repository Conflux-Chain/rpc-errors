export type BaseErrorType = BaseError & {
  name: "BaseError";
};

export class BaseError extends Error {
  readonly code: number;
  override name: string = "BaseError";
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}
