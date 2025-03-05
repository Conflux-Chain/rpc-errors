import { BaseError } from "../../baseError";

export class ExecutionError extends BaseError {
  static override code = -32016;
  override readonly code = ExecutionError.code;
  override name = "ExecutionError";
  constructor(message: string, public readonly data = "") {
    super(ExecutionError.code, message);
  }
  static parseError(_message: string, _data = ""): boolean {
    return true;
  }
}
