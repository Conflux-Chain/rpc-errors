import { BaseError } from "../../baseError";

// the geth execution error , code is 3
export class EthExecutionError extends BaseError {
  static override code = 3;
  override readonly code = EthExecutionError.code;
  override name = "EthExecutionError";
  constructor(message: string, public readonly data = "") {
    super(EthExecutionError.code, message);
  }
  static parseError(_message: string, _data = ""): boolean {
    return true;
  }
}
