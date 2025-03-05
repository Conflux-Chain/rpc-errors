import { EthExecutionError } from "./gethExecutionError";

export class EthInsufficientFundsError extends EthExecutionError {
  override name = "EthInsufficientFunds";
  static pattern = /insufficient funds for gas.*price/;

  static override parseError(message: string): boolean {
    return EthInsufficientFundsError.pattern.test(message);
  }
}
