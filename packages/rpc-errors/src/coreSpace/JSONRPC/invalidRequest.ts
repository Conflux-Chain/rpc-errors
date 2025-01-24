import { BaseError } from "../../baseError";

export class InvalidRequestError extends BaseError {
  static override code = -32600;
  override readonly code = InvalidRequestError.code;
  override name = "InvalidRequest";
  constructor(message: string) {
    super(InvalidRequestError.code, message);
  }

  static parseError(message: string, data = ""): boolean {
    return true;
  }
}

export class FilterNotFoundError extends InvalidRequestError {
  override name = "FilterNotFound";

  static pattern = /Filter not found/;
  static override parseError(message: string, data = ""): boolean {
    return FilterNotFoundError.pattern.test(message);
  }
}
