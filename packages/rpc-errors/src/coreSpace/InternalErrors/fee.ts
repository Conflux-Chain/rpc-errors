import { InternalError } from "./Internal";

export type NonExistentBlockHeaderErrorType = {
  name: "NonExistentBlockHeader";
} & NonExistentBlockHeaderError;

export class NonExistentBlockHeaderError extends InternalError {
  override name = "NonExistentBlockHeader";
  static pattern = /Specified block header does not exist/;
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}
