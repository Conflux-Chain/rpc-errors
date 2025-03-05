import { EthExecutionError } from "./gethExecutionError";

export class ContractExecutionRevertedError extends EthExecutionError {
  override name = "ContractExecutionReverted";
  static pattern = /execution reverted: revert/;

  static override parseError(message: string): boolean {
    return ContractExecutionRevertedError.pattern.test(message);
  }
}

export class ExecutionRevertedError extends EthExecutionError {
  override name = "ExecutionReverted";
  static pattern = /execution reverted/;

  static override parseError(message: string): boolean {
    return ExecutionRevertedError.pattern.test(message);
  }
}
