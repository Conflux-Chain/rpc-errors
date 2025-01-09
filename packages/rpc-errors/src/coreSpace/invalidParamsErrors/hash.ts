import { InvalidParamsError } from "./invalidParams";

export class InvalidHashTypeError extends InvalidParamsError {
  override name = "InvalidHashType";
  static pattern = /expected a \(both 0x-prefixed or not\) hex string with length of 64/;
  constructor(message: string, public override readonly data?: any) {
    super(message, data);
  }
}
