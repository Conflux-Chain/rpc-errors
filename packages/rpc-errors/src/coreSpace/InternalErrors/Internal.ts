import { BaseError } from "../../baseError";

export type InternalErrorType = InternalError & {
  name: "InternalError";
};

export class InternalError extends BaseError {
  static override code = -32603;
  override readonly code = InternalError.code;
  override name = "InternalError";
  constructor(message: string, public readonly data?: any) {
    super(InternalError.code, message);
  }
}
