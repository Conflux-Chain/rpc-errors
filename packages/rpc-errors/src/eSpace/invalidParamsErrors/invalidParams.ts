import { BaseError } from "../../baseError";

export type InvalidParamsErrorType = InvalidParamsError & {
  name: "InvalidParams";
};

export class InvalidParamsError extends BaseError {
  static override code = -32602;
  override readonly code = InvalidParamsError.code;
  override name = "InvalidParams";
  constructor(message: string, public readonly data = "") {
    super(InvalidParamsError.code, message);
  }
  static parseError(_message: string, _data = ""): boolean {
    return true;
  }
}
