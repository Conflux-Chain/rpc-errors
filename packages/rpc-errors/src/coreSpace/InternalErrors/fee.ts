import { InternalError } from "./Internal";

export type NonExistentBlockHeaderErrorType = {
  name: "NonExistentBlockHeader";
} & NonExistentBlockHeaderError;

export class NonExistentBlockHeaderError extends InternalError {
  override name = "NonExistentBlockHeader";
  static pattern = /Specified block header does not exist/;
  static override parseError(message: string, data = ""): boolean {
    return NonExistentBlockHeaderError.pattern.test(message);
  }
}
