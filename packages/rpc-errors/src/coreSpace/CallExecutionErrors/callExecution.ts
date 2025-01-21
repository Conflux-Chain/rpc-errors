import { BaseError } from "../../baseError";

export type CallExecutionErrorType = CallExecutionError & {
  name: "InternalError";
};

export class CallExecutionError extends BaseError {
  static override code = -32015;
  override readonly code = CallExecutionError.code;
  override name = "CallExecution";
  constructor(message: string, public readonly data = "") {
    super(CallExecutionError.code, message);
  }

  static parseError(message: string, data = ""): boolean {
    return true;
  }
}
