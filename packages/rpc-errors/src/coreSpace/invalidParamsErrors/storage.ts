import { InvalidParamsError } from "./invalidParams";

export class StorageLimitOutOfRangeError extends InvalidParamsError {
  override name = "StorageLimitOutOfRange";
  static pattern =
    /storage_limit has to be within the range of u64 but (\d+) supplied!/;

  static override parseError(message: string): boolean {
    return StorageLimitOutOfRangeError.pattern.test(message);
  }
}
