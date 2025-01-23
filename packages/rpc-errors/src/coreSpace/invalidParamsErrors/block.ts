import { InvalidParamsError } from "./invalidParams";

export class BlockHashesLimitExceededError extends InvalidParamsError {
  override name = "BlockHashesLimitExceeded";
  static pattern =
    /filter\.block_hashes can contain up to (\d+) hashes; (\d+) were provided/;
  static override parseError(message: string, data = ""): boolean {
    return BlockHashesLimitExceededError.pattern.test(message);
  }
}

export type PivotChainAssumptionFailedErrorType =
  PivotChainAssumptionFailedError & {
    name: "PivotChainAssumptionFailed";
  };
export class PivotChainAssumptionFailedError extends InvalidParamsError {
  override name = "PivotChainAssumptionFailed";
  static pattern = /pivot chain assumption failed/;

  static override parseError(message: string, data = ""): boolean {
    return PivotChainAssumptionFailedError.pattern.test(message);
  }
}

export type BlockNotFoundErrorType = BlockNotFoundError & {
  name: "BlockNotFound";
};
export class BlockNotFoundError extends InvalidParamsError {
  override name = "BlockNotFound";
  static pattern = /Block not found/;

  static override parseError(message: string, data = ""): boolean {
    return BlockNotFoundError.pattern.test(message);
  }
}
