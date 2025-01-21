import { InvalidParamsError } from "./invalidParams";

export class BlockHashesLimitExceededError extends InvalidParamsError {
  override name = "BlockHashesLimitExceeded";
  static pattern =
    /filter\.block_hashes can contain up to (\d+) hashes; (\d+) were provided/;
  static override parseError(message: string, data = ""): boolean {
    return BlockHashesLimitExceededError.pattern.test(message);
  }
}
