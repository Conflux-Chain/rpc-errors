import { ExecutionError } from "./executionError";

export class BlockHashesNotFoundError extends ExecutionError {
  override name = "BlockHashesNotFound";
  static pattern =
    /cannot get block hashes in the specified epoch, maybe it does not exist/;

  static override parseError(message: string): boolean {
    return BlockHashesNotFoundError.pattern.test(message);
  }
}

export class InvalidEpochIdError extends ExecutionError {
  override name = "InvalidEpochId";
  static pattern = /invalid epoch id/;

  static override parseError(message: string): boolean {
    return InvalidEpochIdError.pattern.test(message);
  }
}
