import { BaseError } from "../../baseError";

export class InvalidInputError extends BaseError {
  static override code = -32000;
  override readonly code = InvalidInputError.code;
  override name = "InvalidInputError";
  constructor(message: string, public readonly data = "") {
    super(InvalidInputError.code, message);
  }
  static parseError(_message: string, _data = ""): boolean {
    return true;
  }
}
