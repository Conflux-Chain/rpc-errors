import { InvalidParamsError } from "./invalidParams";

export type InvalidHashTypeErrorType = {
  name: "InvalidHashType";
} & InvalidHashTypeError;

export class InvalidHashTypeError extends InvalidParamsError {
  override name = "InvalidHashType";
  static pattern =
    /expected a \(both 0x-prefixed or not\) hex string with length/;
  constructor(message: string,  data?: any) {
    super(message, data);
  }
}
