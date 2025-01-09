import { InvalidParamsError } from "./invalidParams";

export type NonExistentBlockHeaderErrorType = {
  name: "NonExistentBlockHeader";
} & NonExistentBlockHeaderError;

export class NonExistentBlockHeaderError extends InvalidParamsError {
  override name = "NonExistentBlockHeader";
  static pattern = /Specified block header does not exist/;
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}
