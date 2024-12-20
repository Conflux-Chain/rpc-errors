import { BaseError } from "../shared/baseError";

export type InvalidParamsType = InvalidParams & {
  name: "InvalidParams";
};

export class InvalidParams extends BaseError  {
  static code = -32602;
  override readonly code = InvalidParams.code;
  override name = "InvalidParams";
  constructor(message: string, public readonly data?: any) {
    super(InvalidParams.code, message);
  }
}
