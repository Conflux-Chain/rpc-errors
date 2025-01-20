import { InvalidParamsError } from "./invalidParams";

export type InvalidHashTypeErrorType = {
  name: "InvalidHashType";
} & InvalidHashTypeError;

export class InvalidHashTypeError extends InvalidParamsError {
  override name = "InvalidHashType";
  static pattern =
    /expected a \(both 0x-prefixed or not\) hex string with length/;

  static override parseError(message: string, data?: any): boolean {
    return InvalidHashTypeError.pattern.test(message);
  }
}
