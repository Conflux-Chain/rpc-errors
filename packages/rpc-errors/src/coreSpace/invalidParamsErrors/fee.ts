import { InvalidParamsError } from "./invalidParams";

export type NonExistentBlockHeaderErrorType = {
  name: "NonExistentBlockHeader";
} & NonExistentBlockHeaderError;

export class NonExistentBlockHeaderError extends InvalidParamsError {
  override name = "NonExistentBlockHeader";
  static pattern = /Specified block header does not exist/;

  static override parseError(message: string): boolean {
    return NonExistentBlockHeaderError.pattern.test(message);
  }
}
